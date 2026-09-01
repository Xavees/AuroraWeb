import { PageCard } from "../components/ui/Cards";
import { Search } from "../components/ui/FormControls";
import { Avatar } from "../components/ui/ListItems";
import type { Navigate } from "../types/app";

// Lista os contatos de emergência.
export function ContactsPage({ navigate }: { navigate: Navigate }) {
  const contacts = ["Beatriz", "Antony Cleyson", "Nicoly Cayres"];
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
