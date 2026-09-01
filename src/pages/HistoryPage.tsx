import { PageCard } from "../components/ui/Cards";
import { Search } from "../components/ui/FormControls";
import { HistoryItem } from "../components/ui/ListItems";

// Lista ocorrências, alertas e rotas recentes.
export function HistoryPage() {
  return (
    <PageCard
      title="Histórico"
      subtitle="Suas últimas ocorrências e rotas."
      icon="↺"
    >
      <Search />
      <div className="tabs">
        <button className="active">Todos</button>
        <button>Rotas</button>
        <button>Alertas</button>
      </div>
      <div className="timeline">
        <HistoryItem
          icon="⌖"
          title="Rota finalizada"
          meta="Casa → Trabalho"
          time="Hoje, 12:00"
        />
        <HistoryItem
          icon="♢"
          title="Alerta SOS encerrado"
          meta="Contato avisado: Mariana"
          time="Hoje, 09:30"
        />
        <HistoryItem
          icon="⌖"
          title="Rota finalizada"
          meta="Escola → Casa"
          time="Ontem, 18:45"
        />
      </div>
      {/* AQUI VOCÊ VAI DESENVOLVER: filtros, paginação e histórico real. */}
    </PageCard>
  );
}
