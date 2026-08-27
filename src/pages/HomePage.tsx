import type { Navigate } from "../types/app";

// Landing page com proposta de valor e benefícios do Aurora.
export function HomePage({ navigate }: { navigate: Navigate }) {
  return (
    <div className="home-page">
      <section className="home-hero">
        <div>
          <span className="eyebrow">SEGURANÇA QUE APROXIMA</span>
          <h1>Cuide de quem importa, onde estiver.</h1>
          <p>
            Monitore dispositivos, compartilhe rotas e mantenha sua rede de
            confiança sempre por perto.
          </p>
          <div className="hero-actions">
            <button className="primary" onClick={() => navigate("signup")}>
              Começar agora
            </button>
            <button className="secondary" onClick={() => navigate("devices")}>
              Ver dispositivos
            </button>
          </div>
        </div>
        <div className="hero-visual">
          <div className="map-grid" />
          <div className="pulse pulse-one" />
          <div className="pulse pulse-two" />
          <div className="phone-mock">
            <div className="phone-map">⌖</div>
            <strong>Você está seguro</strong>
            <small>Localização compartilhada</small>
          </div>
        </div>
      </section>
      <section className="feature-row">
        <article>
          <span>⌖</span>
          <h2>Localização em tempo real</h2>
          <p>Acompanhe as pessoas da sua rede quando elas precisarem.</p>
        </article>
        <article>
          <span>♢</span>
          <h2>Alertas rápidos</h2>
          <p>Receba notificações e sinais de emergência imediatamente.</p>
        </article>
        <article>
          <span>◎</span>
          <h2>Círculos de confiança</h2>
          <p>Organize família e amigos em grupos privados e seguros.</p>
        </article>
      </section>
    </div>
  );
}
