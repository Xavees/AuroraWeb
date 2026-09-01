import { PageCard } from "../components/ui/Cards";
import { Plan } from "../components/ui/ListItems";
import type { Navigate } from "../types/app";

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
