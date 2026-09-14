import { useState, type FormEvent } from "react";
import { PageCard } from "../components/ui/Cards";
import { Field, Toggle } from "../components/ui/FormControls";
import { useAutenticacao } from "../hooks/useAutenticacao";
import type { Navigate, Theme } from "../types/app";

type ProfilePageProps = {
  navigate: Navigate;
  theme: Theme;
  toggleTheme: () => void;
};

// Reúne dados pessoais, plano e preferências.
export function ProfilePage({
  navigate,
  theme,
  toggleTheme,
}: ProfilePageProps) {
  const { usuario, atualizar } = useAutenticacao();
  const [nome, setNome] = useState(usuario?.nome ?? "");
  const [email, setEmail] = useState(usuario?.email ?? "");
  const [telefone, setTelefone] = useState(usuario?.telefone ?? "");
  const [mensagem, setMensagem] = useState("");
  const [tipoMensagem, setTipoMensagem] = useState<"sucesso" | "erro">(
    "sucesso",
  );
  const [salvando, setSalvando] = useState(false);

  async function salvarPerfil(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSalvando(true);
    setMensagem("");

    try {
      const resposta = await atualizar({ nome, email, telefone });
      setTipoMensagem("sucesso");
      setMensagem(resposta);
    } catch (erro) {
      setTipoMensagem("erro");
      setMensagem(
        erro instanceof Error
          ? erro.message
          : "Não foi possível atualizar o perfil.",
      );
    } finally {
      setSalvando(false);
    }
  }

  return (
    <PageCard
      title="Meu perfil"
      subtitle="Gerencie seus dados e preferências."
      icon="♙"
      wide
    >
      <div className="profile-grid">
        {/* // foto temporaria, a logo nova ja foi escolhida ! */}
        <div className="profile-photo">
          <span>{usuario?.nome.charAt(0).toUpperCase() ?? "A"}</span>
          <button>Alterar foto</button>
        </div>
        <form className="form compact" onSubmit={salvarPerfil}>
          <Field
            label="Nome"
            value={nome}
            onChange={(event) => setNome(event.target.value)}
            required
          />
          <Field
            label="E-mail"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          <Field
            label="Telefone"
            type="tel"
            value={telefone}
            onChange={(event) => setTelefone(event.target.value)}
            required
          />
          {mensagem && (
            <p className={`api-message ${tipoMensagem}`}>{mensagem}</p>
          )}
          <button className="primary" disabled={salvando}>
            {salvando ? "Salvando..." : "Salvar alterações"}
          </button>
        </form>
      </div>
      <div className="profile-bottom">
        <section>
          <div className="section-heading">
            <div>
              <h2>Plano atual</h2>
              <p>Plano Padrão</p>
            </div>
            <button className="link" onClick={() => navigate("plans")}>
              Ver planos →
            </button>
          </div>
          <button
            className="secondary wide profile-circles-button"
            onClick={() => navigate("circles")}
          >
            ◎ Visualizar meus círculos
          </button>
        </section>
        <section>
          <h2>Configurações</h2>
          <Toggle label="Notificações" checked />
          <Toggle
            label="Modo escuro"
            checked={theme === "dark"}
            onChange={toggleTheme}
          />
          <Toggle label="Acessibilidade" />
        </section>
      </div>
      <div className="danger-zone">
        <button className="secondary">Alterar senha</button>
        <button className="danger">Excluir conta</button>
      </div>
      {/* AQUI VOCÊ VAI DESENVOLVER COM API REST: carregar e atualizar perfil, preferências e exclusão da conta. */}
    </PageCard>
  );
}
