// Avatar textual criado com as iniciais do contato.
export function Avatar({ name }: { name: string }) {
  return (
    <span className="avatar">
      {name
        .split(" ")
        .map((part) => part[0])
        .slice(0, 2)
        .join("")}
    </span>
  );
}

// Linha que representa um dispositivo monitorado.
export function Device({ name, status }: { name: string; status: string }) {
  return (
    <div className="device-row">
      <span className="device-icon">▯</span>
      <div>
        <strong>{name}</strong>
        <small>{status}</small>
      </div>
      <button className="more">•••</button>
    </div>
  );
}

type HistoryItemProps = {
  icon: string;
  title: string;
  meta: string;
  time: string;
};

// Linha que representa uma ocorrência do histórico.
export function HistoryItem({ icon, title, meta, time }: HistoryItemProps) {
  return (
    <div className="history-row">
      <span className="history-icon">{icon}</span>
      <div>
        <strong>{title}</strong>
        <small>{meta}</small>
      </div>
      <time>{time}</time>
    </div>
  );
}

type PlanProps = {
  name: string;
  price: string;
  features: string[];
  current?: boolean;
};

// Card com preço e benefícios de um plano.
export function Plan({ name, price, features, current = false }: PlanProps) {
  return (
    <article className={`plan ${current ? "current" : "premium"}`}>
      {current && <span className="plan-badge">Plano atual</span>}
      <h2>Plano {name}</h2>
      <strong className="price">{price}</strong>
      <ul>
        {features.map((feature) => (
          <li key={feature}>✓ {feature}</li>
        ))}
      </ul>
      <button className={current ? "secondary wide" : "primary wide"}>
        {current ? "Plano selecionado" : "Assinar Premium"}
      </button>
    </article>
  );
}
