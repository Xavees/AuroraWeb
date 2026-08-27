import { useState } from "react";
import { PageCard } from "../components/ui/Cards";
import type { Navigate } from "../types/app";

type CircleMember = {
  id: number;
  name: string;
  role: string;
  initials: string;
  lastLocation: string;
  lastUpdate: string;
  position: { top: string; left: string };
};

// Dados fictícios usados apenas para construir e testar o layout.
const familyMembers: CircleMember[] = [
  {
    id: 1,
    name: "Xavees",
    role: "Pai",
    initials: "CS",
    lastLocation: "Av. Paulista, São Paulo",
    lastUpdate: "Atualizado há 3 minutos",
    position: { top: "32%", left: "60%" },
  },
  {
    id: 2,
    name: "Jill Valentine ",
    role: "Mãe",
    initials: "MS",
    lastLocation: "Rua das Flores, São Paulo",
    lastUpdate: "Atualizado há 8 minutos",
    position: { top: "58%", left: "35%" },
  },
  {
    id: 3,
    name: "La ele",
    role: "Filho",
    initials: "LS",
    lastLocation: "Colégio Aurora, São Paulo",
    lastUpdate: "Atualizado há 12 minutos",
    position: { top: "68%", left: "72%" },
  },
];

// Exibe o círculo, o papel de cada membro e sua última localização registrada.
export function CirclesPage({ navigate }: { navigate: Navigate }) {
  const [selectedMember, setSelectedMember] = useState(familyMembers[0]);

  return (
    <PageCard
      title="Meu círculo"
      subtitle="Veja quem participa do círculo e a última localização registrada."
      icon="◎"
      wide
    >
      <button className="back" onClick={() => navigate("profile")}>
        ← Voltar para o perfil
      </button>

      <div className="circle-summary">
        <div>
          <span className="circle-label">CÍRCULO ATIVO</span>
          <h2>Família Souza</h2>
          <p>{familyMembers.length} participantes</p>
        </div>
        <span className="circle-status">● Ativo</span>
      </div>

      <div className="circle-layout">
        <section className="members-panel">
          <h2>Membros e papéis</h2>
          <div className="circle-member-list">
            {familyMembers.map((member) => (
              <article
                className={`circle-member ${selectedMember.id === member.id ? "selected" : ""}`}
                key={member.id}
              >
                <span className="avatar circle-avatar">{member.initials}</span>
                <div className="member-data">
                  <strong>{member.name}</strong>
                  <span className="role-badge">{member.role}</span>
                  <small>{member.lastUpdate}</small>
                </div>
                <button
                  className="secondary location-button"
                  onClick={() => setSelectedMember(member)}
                >
                  Ver no mapa
                </button>
              </article>
            ))}
          </div>
        </section>

        <section className="location-panel">
          <div className="location-heading">
            <div>
              <span>Última localização</span>
              <strong>{selectedMember.name}</strong>
            </div>
            <span className="role-badge">{selectedMember.role}</span>
          </div>

          {/* AQUI VOCÊ VAI DESENVOLVER: substituir este desenho por um mapa real. */}
          <div
            className="location-map"
            aria-label="Mapa demonstrativo da última localização"
          >
            <div className="map-street street-horizontal" />
            <div className="map-street street-vertical" />
            <div
              className="member-marker"
              style={selectedMember.position}
              title={selectedMember.name}
            >
              {selectedMember.initials}
            </div>
          </div>

          <div className="location-details">
            <span className="location-pin">⌖</span>
            <div>
              <strong>{selectedMember.lastLocation}</strong>
              <small>{selectedMember.lastUpdate}</small>
            </div>
          </div>
        </section>
      </div>

      {/* AQUI VOCÊ VAI DESENVOLVER: buscar círculos, papéis e localizações no backend. */}
    </PageCard>
  );
}
