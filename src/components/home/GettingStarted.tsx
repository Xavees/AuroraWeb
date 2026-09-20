import { etapasInicio } from "../../config/homeSteps";

export function GettingStarted() {
  return (
    <section
      className="getting-started"
      aria-labelledby="getting-started-title"
    >
      <header className="getting-started-heading">
        <span className="eyebrow">PASSO A PASSO</span>
        <h2 id="getting-started-title">Comece a usar o Aurora</h2>
        <p>
          Da sua primeira conta a uma rotina mais conectada. Conheça cada etapa.
        </p>
      </header>

      <ol className="home-steps" role="list">
        {etapasInicio.map((etapa, indice) => (
          <li className="home-step" key={etapa.id}>
            <div className="home-step-visual">
              {etapa.imagem ? (
                <img
                  src={etapa.imagem.src}
                  alt={etapa.imagem.alt}
                  loading="lazy"
                  width="560"
                  height="420"
                />
              ) : (
                <div className="home-step-placeholder" aria-hidden="true">
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <rect x="5" y="7" width="30" height="26" rx="5" />
                    <circle cx="15" cy="16" r="3" />
                    <path d="m6 28 8-7 7 6 6-10 8 11" />
                  </svg>
                  <span>Espaço para imagem</span>
                  <small>Etapa {indice + 1}</small>
                </div>
              )}
            </div>
            <div className="home-step-copy">
              <span className="home-step-label">Etapa {indice + 1}</span>
              <h3>{etapa.titulo}</h3>
              <p>{etapa.descricao}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
