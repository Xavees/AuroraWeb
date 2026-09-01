import { PageCard } from "../components/ui/Cards";
import { Field } from "../components/ui/FormControls";
import type { Navigate } from "../types/app";

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
