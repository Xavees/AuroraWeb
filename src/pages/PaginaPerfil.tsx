import { FotoPerfil } from "../components/ui/FotoPerfil";
import pageIcon from "../assets/Home/svg/meu-perfil.png";
import { useState, type FormEvent } from "react";
import { PageCard } from "../components/ui/Cartoes";
import { Field, Toggle } from "../components/ui/ControlesFormulario";
import { useAutenticacao } from "../hooks/useAutenticacao";
import type { Navigate, Theme } from "../types/aplicacao";

type ProfilePageProps = {
  navigate: Navigate;
  theme: Theme;
  toggleTheme: () => void;
};

// Reúne dados pessoais, plano e preferências.
export function PaginaPerfil({
  navigate,
  theme,
  toggleTheme,
}: ProfilePageProps) {
  const { usuario, atualizar } = useAutenticacao();
  const [nome, setNome] = useState(usuario?.nome ?? "");
  const [telefone, setTelefone] = useState(usuario?.telefone ?? "");
  const [mensagem, setMensagem] = useState("");
  const [tipoMensagem, setTipoMensagem] = useState<"sucesso" | "erro">(
    "sucesso",
  );
  const [salvando, setSalvando] = useState(false);

  async function salvarPerfil(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (salvando) return;
    setSalvando(true);
    setMensagem("");

    try {
      const resposta = await atualizar({
        nome,
        ...(telefone !== (usuario?.telefone ?? "")
          ? { telefone: telefone.replace(/[\s().-]/g, "") }
          : {}),
      });
      setTipoMensagem("sucesso");
      setMensagem(resposta);
    } catch (erro) {
      setTipoMensagem("erro");
      setMensagem(
        erro instanceof Error && !(erro instanceof TypeError)
          ? erro.message
          : "Não foi possível atualizar o perfil.",
      );
    } finally {
      setSalvando(false);
    }
  }

  if (!usuario)
    return (
      <PageCard
        title="Meu perfil"
        subtitle="Entre na sua conta para editar seus dados."
        icon={<img src={pageIcon} alt="" />}
      >
        <button className="primary" onClick={() => navigate("login")}>
          Entrar
        </button>
      </PageCard>
    );

  return (
    <PageCard
      title="Meu perfil"
      subtitle="Gerencie seus dados e preferências."
      icon={<img src={pageIcon} alt="" />}
      wide
    >
      <div className="profile-grid">
        <FotoPerfil />
        <form className="form compact" onSubmit={salvarPerfil}>
          <Field
            label="Nome"
            value={nome}
            onChange={(event) => setNome(event.target.value)}
            required
          />
          <label className="field">
            <span>E-mail</span>
            <input type="email" value={usuario.email} readOnly />
            <small>A alteração de e-mail não está disponível.</small>
          </label>
          <Field
            label="Telefone"
            type="tel"
            value={telefone}
            onChange={(event) => setTelefone(event.target.value)}
          />

          {mensagem && (
            <p role="status" className={`api-message ${tipoMensagem}`}>
              {mensagem}
            </p>
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
