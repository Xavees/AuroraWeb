import { PageCard } from "../components/ui/Cards";
import { Field, Toggle } from "../components/ui/FormControls";
import { Plan } from "../components/ui/ListItems";
import type { Navigate, Theme } from "../types/app";

// Formulário para convidar um novo contato.
export function FriendRequestPage({ navigate }: { navigate: Navigate }) {
  return (
    <PageCard
      title="Solicitação de amizade"
      subtitle="Informe os dados da pessoa para enviar um convite."
      icon="+"
    >
      <button className="back" onClick={() => navigate("contacts")}>
        ← Voltar
      </button>
      <form className="form" onSubmit={(event) => event.preventDefault()}>
        <Field label="E-mail" type="email" placeholder="amigo@exemplo.com" />
        <div className="separator">
          <span>ou</span>
        </div>
        <Field label="Telefone" type="tel" placeholder="(00) 00000-0000" />
        <Field label="Nome" placeholder="Nome do contato" />
        {/* AQUI VOCÊ VAI DESENVOLVER: busca e envio da solicitação. */}
        <button className="primary wide">Enviar solicitação</button>
      </form>
    </PageCard>
  );
}

// Compara os planos disponíveis.
export function PlansPage({ navigate }: { navigate: Navigate }) {
  return (
    <PageCard
      title="Planos de assinatura"
      subtitle="Escolha a proteção ideal para sua rotina."
      icon="◇"
      wide
    >
      <button className="back" onClick={() => navigate("profile")}>
        ← Voltar
      </button>
      <div className="plans-grid">
        <Plan
          name="Padrão"
          price="Grátis"
          features={[
            "Alerta SOS",
            "Compartilhamento em tempo real",
            "Até 4 contatos",
          ]}
          current
        />
        <Plan
          name="Premium"
          price="R$ 9,99/mês"
          features={[
            "Todos os recursos do Padrão",
            "Dispositivo embarcado",
            "Notificação de contato",
            "Contatos ilimitados",
          ]}
        />
      </div>
      {/* AQUI VOCÊ VAI DESENVOLVER: contratação, pagamento e troca de plano. */}
    </PageCard>
  );
}

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
