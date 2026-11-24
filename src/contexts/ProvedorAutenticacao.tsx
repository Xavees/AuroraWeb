import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  AutenticacaoContext,
  type UsuarioSessao,
} from "./contextoAutenticacao";
import { realizarLogin } from "../services/api/autenticacaoApi";
import {
  buscarUsuario,
  atualizarUsuario,
  enviarFotoPerfil,
} from "../services/api/usuariosApi";
import {
  CHAVE_SESSAO,
  interpretarSessao,
  lerSessao,
  limparSessao,
  type Sessao,
} from "../services/sessao";
import { ErroApi } from "../services/api/clienteApi";
import type { CredenciaisLogin, DadosPerfil } from "../types/autenticacao";

export function ProvedorAutenticacao({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<UsuarioSessao | null>(null);
  const [sessao, setSessao] = useState<Sessao | null>(null);
  const [restaurando, setRestaurando] = useState(true);
  const tentativa = useRef(0);

  function sair() {
    tentativa.current++;
    limparSessao();
    setUsuario(null);
    setSessao(null);
  }

  useEffect(() => {
    const controller = new AbortController();
    const salva = lerSessao();
    const versao = tentativa.current;
    async function restaurar() {
      try {
        if (salva) {
          const perfil = await buscarUsuario(
            salva.usuarioId,
            salva.token,
            controller.signal,
          );
          if (
            !controller.signal.aborted &&
            versao === tentativa.current &&
            salva.expiraEm > Date.now()
          ) {
            setUsuario(perfil);
            setSessao(salva);
          }
        }
      } catch {
        if (!controller.signal.aborted) limparSessao();
      } finally {
        if (!controller.signal.aborted) setRestaurando(false);
      }
    }
    void restaurar();
    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (!sessao) return;
    function verificarExpiracao() {
      if (sessao && sessao.expiraEm <= Date.now()) {
        tentativa.current++;
        limparSessao();
        setUsuario(null);
        setSessao(null);
      }
    }
    const timer = window.setTimeout(
      verificarExpiracao,
      Math.max(0, sessao.expiraEm - Date.now()),
    );
    window.addEventListener("focus", verificarExpiracao);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("focus", verificarExpiracao);
    };
  }, [sessao]);

  async function entrar(dados: CredenciaisLogin, manterConectado: boolean) {
    const versao = ++tentativa.current;
    const resposta = await realizarLogin({
      email: dados.email.trim(),
      senha: dados.senha,
    });
    const nova = interpretarSessao(resposta);
    const perfil = await buscarUsuario(nova.usuarioId, nova.token);
    if (versao !== tentativa.current) throw new Error("Entrada cancelada.");
    if (nova.expiraEm <= Date.now())
      throw new Error("Sua sessão expirou. Entre novamente.");
    limparSessao();
    (manterConectado ? localStorage : sessionStorage).setItem(
      CHAVE_SESSAO,
      JSON.stringify(nova),
    );
    setSessao(nova);
    setUsuario(perfil);
  }

  async function atualizar(dados: DadosPerfil): Promise<string> {
    if (!sessao || sessao.expiraEm <= Date.now()) {
      sair();
      throw new Error("Entre novamente para atualizar seu perfil.");
    }
    const versao = tentativa.current;
    try {
      const perfil = await atualizarUsuario(
        sessao.usuarioId,
        sessao.token,
        dados,
      );
      if (versao !== tentativa.current || sessao.expiraEm <= Date.now())
        throw new Error("Sua sessão expirou. Entre novamente.");
      setUsuario(perfil);
      return "Perfil atualizado com sucesso.";
    } catch (erro) {
      if (
        erro instanceof ErroApi &&
        erro.status === 401 &&
        versao === tentativa.current
      )
        sair();
      throw erro;
    }
  }

  async function enviarFoto(arquivo: File) {
    if (!sessao || sessao.expiraEm <= Date.now()) {
      sair();
      throw new Error("Entre novamente para alterar sua foto.");
    }
    const versao = tentativa.current;
    try {
      const perfil = await enviarFotoPerfil(arquivo, sessao.token);
      if (versao !== tentativa.current || sessao.expiraEm <= Date.now())
        throw new Error("Sua sessão expirou. Entre novamente.");
      setUsuario(perfil);
    } catch (erro) {
      if (
        erro instanceof ErroApi &&
        erro.status === 401 &&
        versao === tentativa.current
      )
        sair();
      throw erro;
    }
  }

  if (restaurando) return <p role="status">Carregando sua sessão…</p>;

  return (
    <AutenticacaoContext.Provider
      value={{
        usuario,
        token: sessao?.token ?? null,
        estaLogado: !!usuario && !!sessao,
        entrar,
        atualizar,
        sair,
        enviarFoto,
      }}
    >
      {children}
    </AutenticacaoContext.Provider>
  );
}
