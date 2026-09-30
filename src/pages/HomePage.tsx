import type { Navigate } from "../types/app";
import { GettingStarted } from "../components/home/GettingStarted";
import { Ecosystem } from "../components/home/Ecosystem";
import { Reviews } from "../components/home/Reviews";
import { HomeFaq } from "../components/home/HomeFaq";

// Landing page com proposta de valor e benefícios do Aurora.
export function HomePage({ navigate }: { navigate: Navigate }) {
  return (
    <div className="home-page">
      <section className="home-hero">
        <div>
          <span className="eyebrow">SEGURANÇA CONSTRUÍDA EM COMUNIDADE</span>
          <h1>Juntos, por caminhos mais seguros.</h1>
          <p>
            O Aurora conecta pessoas para compartilhar informações sobre zonas
            de risco, segurança e iluminação dos locais. Contribua com a
            comunidade e conheça melhor os lugares por onde você passa.
          </p>
          <div className="hero-actions">
            <button className="primary" onClick={() => navigate("signup")}>
              Começar agora
            </button>
            <button className="secondary" onClick={() => navigate("risk-map")}>
              Ver mapa demarcado por risco
            </button>
          </div>
        </div>
        <div className="hero-visual">
          <div className="map-grid" />
          <div className="pulse pulse-one" />
          <div className="pulse pulse-two" />
          <div className="phone-mock">
            <div className="phone-map">⌖</div>
            <strong>Mapa comunitário</strong>
            <small>Informação que aproxima</small>
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
      <Ecosystem />
      <GettingStarted />
      <Reviews />
      <HomeFaq />
      <section className="home-signup" aria-labelledby="home-signup-title">
        <span className="eyebrow">FAÇA PARTE DO AURORA</span>
        <h2 id="home-signup-title">Sua rede de confiança começa com você.</h2>
        <p>
          Crie sua conta e dê o primeiro passo para fazer parte do ecossistema
          Aurora.
        </p>
        <button
          className="primary"
          type="button"
          onClick={() => navigate("signup")}
        >
          Começar agora
        </button>
      </section>
    </div>
  );
}
