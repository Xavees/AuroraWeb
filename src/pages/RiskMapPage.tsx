import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Navigate } from "../types/app";

// A camada de riscos será integrada à API Nest.js quando o contrato for definido.
// O mapa base não representa avaliações nem classificação de segurança.
export function RiskMapPage({ navigate }: { navigate: Navigate }) {
  const container = useRef<HTMLDivElement>(null);
  const mapa = useRef<L.Map | null>(null);
  const [erroMapa, setErroMapa] = useState(false);
  const [tentativa, setTentativa] = useState(0);

  useEffect(() => {
    if (!container.current) return;
    const instancia = L.map(container.current, {
      scrollWheelZoom: false,
    }).setView([-23.5505, -46.6333], 12);
    mapa.current = instancia;
    const camada = L.tileLayer(
      "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        maxZoom: 19,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      },
    ).addTo(instancia);
    camada.on("tileerror", () => setErroMapa(true));
    const observer = new ResizeObserver(() => instancia.invalidateSize());
    observer.observe(container.current);
    return () => {
      observer.disconnect();
      instancia.remove();
      mapa.current = null;
    };
  }, [tentativa]);

  return (
    <section className="risk-page" aria-labelledby="risk-map-title">
      <button className="back" onClick={() => navigate("home")}>
        ← Voltar ao início
      </button>
      <header className="risk-heading">
        <span className="eyebrow">MAPA COMUNITÁRIO</span>
        <h1 id="risk-map-title">Mapa demarcado por risco</h1>
        <p>
          Conheça a região e, em breve, consulte informações compartilhadas pela
          comunidade.
        </p>
      </header>
      <div className="risk-status" role="status">
        <strong>Áreas de risco ainda não disponíveis</strong>
        <p>
          Por enquanto, você pode explorar o mapa base. As demarcações serão
          exibidas quando a fonte de dados estiver integrada. Uma área sem
          marcação não significa uma área segura.
        </p>
      </div>
      <div className="risk-toolbar">
        <span>Vista inicial: São Paulo</span>
        <button
          className="secondary"
          onClick={() => mapa.current?.setView([-23.5505, -46.6333], 12)}
        >
          Centralizar mapa
        </button>
      </div>
      {erroMapa && (
        <div className="risk-map-error" role="alert">
          <p>Não foi possível carregar parte do mapa. Verifique sua conexão.</p>
          <button
            className="secondary"
            onClick={() => {
              setErroMapa(false);
              setTentativa((valor) => valor + 1);
            }}
          >
            Tentar novamente
          </button>
        </div>
      )}
      <div
        ref={container}
        className="risk-map"
        role="region"
        aria-label="Mapa interativo da região de São Paulo, sem dados de risco"
      />
      <p className="risk-help">
        Arraste para explorar e use os botões + e − para ajustar o zoom. Com o
        mapa em foco, use as setas do teclado para navegar.
      </p>
    </section>
  );
}
