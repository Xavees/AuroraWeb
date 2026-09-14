import { useState, type ReactNode } from "react";
import {
  atualizarPerfil,
  realizarLogin,
  type CredenciaisLogin,
  type DadosPerfil,
} from "../services/api/authApi";
import { AutenticacaoContext, type UsuarioSessao } from "./autenticacaoContext";

const CHAVE_SESSAO = "aurora-usuario";

type SessaoSalva = {
  usuario: UsuarioSessao;
  token: string;
};

function recuperarSessaoSalva(): SessaoSalva | null {
  const salvo =
    localStorage.getItem(CHAVE_SESSAO) ?? sessionStorage.getItem(CHAVE_SESSAO);
  if (!salvo) return null;

  try {
    const sessao = JSON.parse(salvo) as SessaoSalva;
    return sessao.usuario && sessao.token ? sessao : null;
  } catch {
    localStorage.removeItem(CHAVE_SESSAO);
    sessionStorage.removeItem(CHAVE_SESSAO);
    return null;
  }
}

// Mantém a sessão disponível durante toda a aplicação.
export function AutenticacaoProvider({ children }: { children: ReactNode }) {
  const [sessao, setSessao] = useState<SessaoSalva | null>(
    recuperarSessaoSalva,
  );

  async function entrar(
    credenciais: CredenciaisLogin,
    manterConectado: boolean,
  ) {
    const resposta = await realizarLogin(credenciais);
    const armazenamento = manterConectado ? localStorage : sessionStorage;
    const novaSessao = { usuario: resposta.user, token: resposta.token };

    localStorage.removeItem(CHAVE_SESSAO);
    sessionStorage.removeItem(CHAVE_SESSAO);
    armazenamento.setItem(CHAVE_SESSAO, JSON.stringify(novaSessao));
    setSessao(novaSessao);
  }

  async function atualizar(dados: DadosPerfil) {
    if (!sessao) throw new Error("Você precisa entrar novamente.");

    const resposta = await atualizarPerfil(dados, sessao.token);
    const sessaoAtualizada = { ...sessao, usuario: resposta.user };
    const armazenamento = localStorage.getItem(CHAVE_SESSAO)
      ? localStorage
      : sessionStorage;

    armazenamento.setItem(CHAVE_SESSAO, JSON.stringify(sessaoAtualizada));
    setSessao(sessaoAtualizada);
    return resposta.message;
  }

  function sair() {
    localStorage.removeItem(CHAVE_SESSAO);
    sessionStorage.removeItem(CHAVE_SESSAO);
    setSessao(null);
  }

  return (
    <AutenticacaoContext.Provider
      value={{
        usuario: sessao?.usuario ?? null,
        estaLogado: Boolean(sessao),
        entrar,
        atualizar,
        sair,
      }}
    >
      {children}
    </AutenticacaoContext.Provider>
  );
}
