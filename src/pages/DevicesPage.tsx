import { PageCard } from "../components/ui/Cards";
import { Toggle } from "../components/ui/FormControls";
import { Device } from "../components/ui/ListItems";

// Gerencia dispositivos, locais favoritos e círculos.
export function DevicesPage() {
  return (
    <PageCard
      title="Dispositivos e círculos"
      subtitle="Gerencie quem e o que você acompanha."
      icon="▣"
      wide
    >
      <div className="device-layout">
        <section>
          <h2>Dispositivos monitorados</h2>
          <div className="list">
            <Device name="iPhone 15" status="Online • agora" />
            <Device name="Galaxy S23" status="Online • 5 min" />
            <Device name="Moto G" status="Offline • 2h" />
          </div>
          <button className="secondary wide">+ Adicionar dispositivo</button>
          <h2 className="section-title">Locais favoritos</h2>
          <div className="place-row">
            ⌖ <span>Casa</span>
          </div>
          <div className="place-row">
            ⌖ <span>Escola</span>
          </div>
        </section>
        <aside className="circles">
          <h2>Círculos</h2>
          <Toggle label="Família" checked />
          <Toggle label="Amigos" checked />
          <Toggle label="Trabalho" />
        </aside>
      </div>
      {/* AQUI VOCÊ VAI DESENVOLVER: dispositivos, locais e círculos reais. */}
    </PageCard>
  );
}
