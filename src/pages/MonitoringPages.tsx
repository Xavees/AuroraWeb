import { PageCard } from "../components/ui/Cards";
import { Search, Toggle } from "../components/ui/FormControls";
import { Avatar, Device, HistoryItem } from "../components/ui/ListItems";
import type { Navigate } from "../types/app";

// Lista os contatos de emergência.
export function ContactsPage({ navigate }: { navigate: Navigate }) {
  const contacts = ["Mariana Alves", "Lucas Ferreira", "Carlos Souza"];
  return (
    <PageCard
      title="Contatos"
      subtitle="Pessoas selecionadas para casos de emergência."
      icon="♙"
    >
      <Search />
      <div className="list">
        {contacts.map((name, index) => (
          <div className="contact-row" key={name}>
            <Avatar name={name} />
            <div>
              <strong>{name}</strong>
              <small>
                {index === 2 ? "Offline há 20 min" : "Online agora"}
              </small>
            </div>
            <span className={index === 2 ? "presence offline" : "presence"} />
          </div>
        ))}
      </div>
      <button
        className="primary wide"
        onClick={() => navigate("friend-request")}
      >
        + Adicionar contato
      </button>
      {/* AQUI VOCÊ VAI DESENVOLVER: busca, listagem e status dos contatos. */}
    </PageCard>
  );
}

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

// Gerencia dispositivos, locais favoritos e círculos.
export function DevicesPage() {
  return (
    <PageCard
      title="Dispositivos e círculos"
      subtitle="Gerencie quem e o que você acompanha."
      icon="▣"
      wide
    >
      <div className="device-layout">
        <section>
          <h2>Dispositivos monitorados</h2>
          <div className="list">
            <Device name="iPhone 15" status="Online • agora" />
            <Device name="Galaxy S23" status="Online • 5 min" />
            <Device name="Moto G" status="Offline • 2h" />
          </div>
          <button className="secondary wide">+ Adicionar dispositivo</button>
          <h2 className="section-title">Locais favoritos</h2>
          <div className="place-row">
            ⌖ <span>Casa</span>
          </div>
          <div className="place-row">
            ⌖ <span>Escola</span>
          </div>
        </section>
        <aside className="circles">
          <h2>Círculos</h2>
          <Toggle label="Família" checked />
          <Toggle label="Amigos" checked />
          <Toggle label="Trabalho" />
        </aside>
      </div>
      {/* AQUI VOCÊ VAI DESENVOLVER: dispositivos, locais e círculos reais. */}
    </PageCard>
  );
}
