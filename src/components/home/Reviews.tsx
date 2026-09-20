import { useRef } from "react";
import { imagensAvaliacoes } from "../../config/homeReviews";

export function Reviews() {
  const faixa = useRef<HTMLUListElement>(null);

  function navegar(direcao: number) {
    const lista = faixa.current;
    if (!lista) return;
    const cartao = lista.firstElementChild;
    if (!cartao) return;
    const distancia =
      cartao.getBoundingClientRect().width +
      parseFloat(getComputedStyle(lista).columnGap);
    lista.scrollBy({
      left: direcao * distancia,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  }

  return (
    <section className="home-reviews" aria-labelledby="reviews-title">
      <header className="home-reviews-heading">
        <span className="eyebrow">COMUNIDADE AURORA</span>
        <h2 id="reviews-title">Avaliações e experiências</h2>
      </header>
      <ul
        className="home-reviews-track"
        id="reviews-track"
        ref={faixa}
        tabIndex={0}
        aria-label="Imagens de avaliações e experiências"
      >
        {imagensAvaliacoes.map((item, indice) => (
          <li className="home-review-card" key={item.id}>
            {item.imagem ? (
              <img
                src={item.imagem.src}
                alt={item.imagem.alt}
                loading="lazy"
                width="400"
                height="400"
              />
            ) : (
              <div className="home-review-placeholder">
                <svg
                  aria-hidden="true"
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
                <small>Avaliação {indice + 1}</small>
              </div>
            )}
          </li>
        ))}
      </ul>
      <div className="home-reviews-controls">
        <button
          className="icon-button"
          type="button"
          aria-label="Ver avaliações anteriores"
          aria-controls="reviews-track"
          onClick={() => navegar(-1)}
        >
          <span aria-hidden="true">←</span>
        </button>
        <button
          className="icon-button"
          type="button"
          aria-label="Ver próximas avaliações"
          aria-controls="reviews-track"
          onClick={() => navegar(1)}
        >
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </section>
  );
}
