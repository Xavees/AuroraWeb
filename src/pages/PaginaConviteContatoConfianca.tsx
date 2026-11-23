import { PageCard } from "../components/ui/Cartoes";
import { Field } from "../components/ui/ControlesFormulario";
import type { Navigate } from "../types/aplicacao";

// Formulário para convidar um novo contato.
export function PaginaConviteContatoConfianca({ navigate }: { navigate: Navigate }) {
  return (
    <PageCard
      title="Convite de contato de confiança"
      subtitle="Convide uma pessoa para fazer parte da sua rede de confiança."
      icon="+"
    >
      <button className="back" onClick={() => navigate("contacts")}>
        ← Voltar
      </button>
      <form className="form" onSubmit={(event) => event.preventDefault()}>
        <Field label="E-mail" type="email" placeholder="contato@exemplo.com" />
        <div className="separator">
          <span>ou</span>
        </div>
        <Field label="Telefone" type="tel" placeholder="(00) 00000-0000" />
        <Field label="Nome" placeholder="Nome do contato" />
        {/* AQUI VOCÊ VAI DESENVOLVER COM API REST: busca e envio da solicitação. */}
        <button className="primary wide">Enviar convite</button>
      </form>
    </PageCard>
  );
}
