import pageIcon from "../assets/Home/svg/planos-de-assinatura.png";
import { PageCard } from "../components/ui/Cartoes";
import { Plan } from "../components/ui/ItensLista";
import type { Navigate } from "../types/aplicacao";

// Compara os planos disponíveis.
export function PaginaPlanos({ navigate }: { navigate: Navigate }) {
  return (
    <PageCard
      title="Planos de assinatura"
      subtitle="Escolha a proteção ideal para sua rotina."
      icon={<img src={pageIcon} alt="" />}
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
      {/* AQUI VOCÊ VAI DESENVOLVER COM API REST: contratação, pagamento e troca de plano. */}
    </PageCard>
  );
}
