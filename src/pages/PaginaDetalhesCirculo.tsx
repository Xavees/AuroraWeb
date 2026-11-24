import iconeCirculo from "../assets/Home/svg/circulo.png";
import { useEffect, useState } from "react";
import { PageCard } from "../components/ui/Cartoes";

import { useAutenticacao } from "../hooks/useAutenticacao";
import * as api from "../services/api/circulosApi";
import type { Navigate } from "../types/aplicacao";

type Resultado = {
  chave: string;

  membros: api.MembroCirculoApi[];
  ativo?: api.CirculoApi;
  erro?: string;
};
const mensagemErro = (erro: unknown) =>
  erro instanceof Error && !(erro instanceof TypeError)
    ? erro.message
    : "Não foi possível acessar a API. Tente novamente.";

export function PaginaDetalhesCirculo({
  navigate,
  id,
}: {
  navigate: Navigate;
  id: string;
}) {
  const { token, usuario } = useAutenticacao();

  const [versao, setVersao] = useState(0);
  const [resultado, setResultado] = useState<Resultado | null>(null);
  const [mensagem, setMensagem] = useState("");
  const [ocupado, setOcupado] = useState(false);
  const chave = `${id}:${versao}:${usuario?.id}`;
  useEffect(() => {
    const controller = new AbortController();
    async function carregar() {
      try {
        if (!token)
          throw new Error("Entre novamente para consultar seus círculos.");
        const [ativo, membros] = await Promise.all([
          api.buscarCirculo(id, token, controller.signal),
          api.listarMembrosCirculo(id, token, controller.signal),
        ]);
        if (!controller.signal.aborted) setResultado({ chave, ativo, membros });
      } catch (erro) {
        if (!controller.signal.aborted)
          setResultado({
            chave,
            membros: [],
            erro: mensagemErro(erro),
          });
      }
    }
    void carregar();
    return () => controller.abort();
  }, [chave, id, token]);

  async function executar(
    acao: () => Promise<unknown>,
    confirmacao?: string,
    voltar = false,
  ) {
    if (ocupado || (confirmacao && !window.confirm(confirmacao))) return;
    setOcupado(true);
    setMensagem("");
    try {
      await acao();
      if (voltar) {
        navigate("circles");
        return;
      }
      setMensagem("Alteração concluída.");
      setVersao((valor) => valor + 1);
    } catch (erro) {
      setMensagem(mensagemErro(erro));
    } finally {
      setOcupado(false);
    }
  }

  if (!resultado || resultado.chave !== chave)
    return (
      <PageCard
        title="Meus círculos"
        subtitle="Carregando seus círculos…"
        icon={<img src={iconeCirculo} alt="" />}
      >
        <p role="status">Aguarde um instante.</p>
      </PageCard>
    );
  if (resultado.erro)
    return (
      <PageCard
        title="Meus círculos"
        subtitle="Não foi possível carregar os círculos."
        icon={<img src={iconeCirculo} alt="" />}
      >
        <p role="alert">{resultado.erro}</p>
        <button className="back" onClick={() => navigate("circles")}>
          ← Voltar para círculos
        </button>
        <button
          className="primary"
          onClick={() => setVersao((valor) => valor + 1)}
        >
          Tentar novamente
        </button>
      </PageCard>
    );
  if (!resultado.ativo || !token) return null;
  const circulo = resultado.ativo;
  const administrador = resultado.membros.some(
    (m) => m.usuarioId === usuario?.id && m.funcao === "ADMINISTRADOR",
  );
  return (
    <PageCard
      title={circulo.nome}
      subtitle="Participantes, convites e configurações deste círculo."
      icon={<img src={iconeCirculo} alt="" />}
      wide
    >
      <button className="back" onClick={() => navigate("circles")}>
        ← Voltar para círculos
      </button>
      <div className="circle-summary">
        <div>
          <h2>{circulo.nome}</h2>
          <p>{resultado.membros.length} participantes</p>
          <span className="role-badge">
            {administrador ? "Você é administrador" : "Você é membro"}
          </span>
        </div>
      </div>
      <section className="circle-invite">
        <h2>Convide pessoas de confiança</h2>
        <p>
          Código do círculo: <strong>{circulo.codigoConvite}</strong>
        </p>
        <button
          className="secondary"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(circulo.codigoConvite);
              setMensagem("Código copiado.");
            } catch {
              setMensagem(
                "Não foi possível copiar. Selecione o código acima e copie manualmente.",
              );
            }
          }}
        >
          Copiar código
        </button>
      </section>
      {mensagem && <p role="status">{mensagem}</p>}
      <h2>Participantes</h2>
      <div className="circle-member-list">
        {resultado.membros.map((m) => (
          <article className="circle-member" key={m.id}>
            <div className="member-data">
              <strong>
                {m.usuarioId === usuario?.id
                  ? `${usuario.nome} (você)`
                  : `Usuário ${m.usuarioId}`}
              </strong>
              <span className="role-badge">
                {m.funcao === "ADMINISTRADOR" ? "Administrador" : "Membro"}
              </span>
              <small>
                Entrou em {new Date(m.dataEntrada).toLocaleDateString("pt-BR")}
              </small>
            </div>
            {administrador && m.usuarioId !== usuario?.id && (
              <div className="circle-actions">
                <button
                  className="secondary"
                  disabled={ocupado}
                  onClick={() =>
                    void executar(
                      () =>
                        api.alterarFuncao(
                          circulo.id,
                          m.usuarioId,
                          m.funcao === "MEMBRO" ? "ADMINISTRADOR" : "MEMBRO",
                          token,
                        ),
                      "Alterar a função deste participante?",
                    )
                  }
                >
                  {m.funcao === "MEMBRO"
                    ? "Tornar administrador"
                    : "Tornar membro"}
                </button>
                {m.funcao === "MEMBRO" && (
                  <button
                    className="danger"
                    disabled={ocupado}
                    onClick={() =>
                      void executar(
                        () => api.removerMembro(circulo.id, m.usuarioId, token),
                        "Remover este participante? O retorno dependerá das regras de bloqueio do círculo.",
                      )
                    }
                  >
                    Remover
                  </button>
                )}
              </div>
            )}
          </article>
        ))}
      </div>
      <p className="form-note">
        A localização dos participantes ainda não está integrada nesta tela.
      </p>
      {administrador && (
        <details className="circle-management">
          <summary>Administrar círculo</summary>
          <form
            className="form"
            key={circulo.id + circulo.nome}
            onSubmit={(event) => {
              event.preventDefault();
              const nome = String(
                new FormData(event.currentTarget).get("nome") ?? "",
              );
              void executar(() =>
                api.atualizarCirculo(circulo.id, nome, token),
              );
            }}
          >
            <label className="field">
              <span>Nome do círculo</span>
              <input
                name="nome"
                defaultValue={circulo.nome}
                minLength={3}
                maxLength={100}
                required
              />
            </label>
            <button className="secondary" disabled={ocupado}>
              Salvar nome
            </button>
          </form>
          <button
            className="secondary"
            disabled={ocupado}
            onClick={() =>
              void executar(
                () => api.renovarConvite(circulo.id, token),
                "Gerar outro código? O código atual deixará de funcionar.",
              )
            }
          >
            Renovar código de convite
          </button>
          <form
            className="form"
            onSubmit={(event) => {
              event.preventDefault();
              const email = String(
                new FormData(event.currentTarget).get("email") ?? "",
              );
              void executar(
                () => api.desbloquearMembroPorEmail(circulo.id, email, token),
                "Desbloquear este usuário? Isso não o adiciona novamente ao círculo.",
              );
            }}
          >
            <label className="field">
              <span>E-mail do usuário a desbloquear</span>
              <input
                name="email"
                type="email"
                maxLength={100}
                placeholder="usuario@exemplo.com"
                required
              />
            </label>
            <button className="secondary" disabled={ocupado}>
              Desbloquear usuário
            </button>
          </form>
          <button
            className="danger"
            disabled={ocupado}
            onClick={() =>
              void executar(
                () => api.excluirCirculo(circulo.id, token),
                "Desativar este círculo para todos os participantes?",
                true,
              )
            }
          >
            Desativar círculo
          </button>
        </details>
      )}
      <button
        className="danger"
        disabled={ocupado}
        onClick={() =>
          void executar(
            () => api.sairCirculo(circulo.id, token),
            "Sair do círculo? A API poderá transferir a administração ou desativar o círculo se ele ficar vazio.",
            true,
          )
        }
      >
        Sair do círculo
      </button>
    </PageCard>
  );
}
