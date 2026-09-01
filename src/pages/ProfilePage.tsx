import { PageCard } from "../components/ui/Cards";
import { Field, Toggle } from "../components/ui/FormControls";
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
  return (
    <PageCard
      title="Meu perfil"
      subtitle="Gerencie seus dados e preferências."
      icon="♙"
      wide
    >
      <div className="profile-grid">
        <div className="profile-photo">
          <span>XA</span>
          <button>Alterar foto</button>
        </div>
        <form
          className="form compact"
          onSubmit={(event) => event.preventDefault()}
        >
          <Field label="Nome" defaultValue="Usuário Aurora" />
          <Field
            label="E-mail"
            type="email"
            defaultValue="usuario@aurora.com"
          />
          <Field label="Telefone" defaultValue="(00) 00000-0000" />
          <button className="primary">Salvar alterações</button>
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
      {/* AQUI VOCÊ VAI DESENVOLVER: perfil, preferências e exclusão da conta. */}
    </PageCard>
  );
}
