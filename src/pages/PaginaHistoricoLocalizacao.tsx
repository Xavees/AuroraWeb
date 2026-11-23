import pageIcon from "../assets/Home/svg/historico-localizacao.png";
import { useState } from "react";
import { PageCard } from "../components/ui/Cartoes";

export type LocationRecord = { id: string; place: string; recordedAt: string };

export function PaginaHistoricoLocalizacao({ records = [] }: { records?: LocationRecord[] }) {
  const [date, setDate] = useState("");
  const [query, setQuery] = useState("");
  const filtered = records.filter((record) => {
    const timestamp = new Date(record.recordedAt);
    const localDate = `${timestamp.getFullYear()}-${String(timestamp.getMonth() + 1).padStart(2, "0")}-${String(timestamp.getDate()).padStart(2, "0")}`;
    return (
      (!date || localDate === date) &&
      record.place
        .toLocaleLowerCase("pt-BR")
        .includes(query.toLocaleLowerCase("pt-BR"))
    );
  });
  return (
    <PageCard
      title="Histórico de localização"
      subtitle="Consulte os lugares registrados e quando você esteve por lá."
      icon={<img src={pageIcon} alt="" />}
      wide
    >
      <div className="location-history-filters">
        <label className="field">
          <span>Buscar local</span>
          <input
            type="search"
            placeholder="Nome ou endereço"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
        <label className="field">
          <span>Data</span>
          <input
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </label>
        <button
          className="secondary"
          onClick={() => {
            setDate("");
            setQuery("");
          }}
        >
          Limpar filtros
        </button>
      </div>
      <p role="status">{filtered.length} registros encontrados</p>
      {filtered.length ? (
        <ol className="location-history-list">
          {filtered.map((record) => (
            <li key={record.id}>
              <span className="history-icon" aria-hidden="true">
                ⌖
              </span>
              <div>
                <strong>{record.place}</strong>
                <time dateTime={record.recordedAt}>
                  {new Date(record.recordedAt).toLocaleString("pt-BR")}
                </time>
              </div>
            </li>
          ))}
        </ol>
      ) : (
        <div className="location-history-empty">
          <span aria-hidden="true">⌖</span>
          <h2>
            {records.length
              ? "Nenhum local encontrado"
              : "Seu histórico começa aqui"}
          </h2>
          <p>
            {records.length
              ? "Tente outra data ou outro nome de local."
              : "As localizações aparecerão aqui quando o registro estiver disponível. Ainda não há dados conectados à sua conta."}
          </p>
        </div>
      )}
    </PageCard>
  );
}
