import pageIcon from "../assets/Home/svg/contatos-de-confianca.png";
import { PageCard } from "../components/ui/Cartoes";
import { Search } from "../components/ui/ControlesFormulario";
import { Avatar } from "../components/ui/ItensLista";
import type { Navigate } from "../types/aplicacao";

// Lista os contatos de emergência.
export function PaginaContatos({ navigate }: { navigate: Navigate }) {
  const contacts = ["Beatriz", "Antony Cleyson", "Nicoly Cayres"];
  return (
    <PageCard
      title="Contatos de confiança"
      subtitle="Pessoas selecionadas para casos de emergência."
      icon={<img src={pageIcon} alt="" />}
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
        onClick={() => navigate("trusted-contact-invite")}
      >
        + Convidar contato de confiança
      </button>
      {/* AQUI VOCÊ VAI DESENVOLVER COM API REST: busca, listagem e status dos contatos. */}
    </PageCard>
  );
}
