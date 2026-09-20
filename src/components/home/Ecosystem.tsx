function EspacoImagem({ nome }: { nome: string }) {
  return (
    <div className="ecosystem-image" aria-hidden="true">
      {/* Substituir pelo arquivo escolhido, com texto alternativo descritivo. */}
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
      <small>{nome}</small>
    </div>
  );
}

export function Ecosystem() {
  return (
    <section className="ecosystem" aria-labelledby="ecosystem-title">
      <header className="ecosystem-heading">
        <span className="eyebrow">ECOSSISTEMA AURORA</span>
        <h2 id="ecosystem-title">
          Um Aurora, diferentes formas de estar perto.
        </h2>
        <p>
          No celular, pelo navegador ou com o Localizador Aurora: queremos
          ampliar as formas de acessar sua rede de confiança, respeitando
          diferentes rotinas e necessidades.
        </p>
      </header>

      <article className="ecosystem-device">
        <EspacoImagem nome="Localizador Aurora" />
        <div className="ecosystem-copy">
          <span className="eyebrow">LOCALIZADOR AURORA</span>
          <h3>Cuidado ao alcance de um botão.</h3>
          <p>
            Um dispositivo compacto, pensado para acompanhar você e facilitar o
            pedido de ajuda quando manusear o celular é difícil. O botão SOS
            físico oferece mais uma forma de acionar sua rede de apoio.
          </p>
          <p>
            Integrado ao aplicativo, o localizador combina localização por GPS e
            conexão por Bluetooth ou Wi-Fi para apoiar o acompanhamento e o
            envio de alertas, conforme a conexão disponível.
          </p>
          <ul
            className="ecosystem-features"
            aria-label="Recursos do localizador"
          >
            <li>Botão SOS físico</li>
            <li>Localização por GPS</li>
            <li>Integração com o aplicativo</li>
          </ul>
        </div>
      </article>

      <div className="ecosystem-platforms">
        <article className="ecosystem-platform">
          <EspacoImagem nome="Aurora Mobile" />
          <div className="ecosystem-copy">
            <span className="eyebrow">AURORA MOBILE</span>
            <h3>Com você durante o caminho.</h3>
            <p>
              Pensado para Android, o aplicativo reúne localização
              compartilhada, mapa colaborativo e acesso ao SOS. Uma forma de
              levar sua rede de confiança com você durante os deslocamentos.
            </p>
          </div>
        </article>
        <article className="ecosystem-platform">
          <EspacoImagem nome="Aurora Web" />
          <div className="ecosystem-copy">
            <span className="eyebrow">AURORA WEB</span>
            <h3>Uma visão mais ampla da sua rede.</h3>
            <p>
              Pelo navegador, acompanhe pessoas e dispositivos, consulte mapas e
              organize as informações da sua conta. Uma interface adaptada a
              diferentes telas, sem precisar instalar o aplicativo.
            </p>
          </div>
        </article>
      </div>

      <div className="ecosystem-accessibility">
        <span className="eyebrow">ACESSO E INCLUSÃO</span>
        <h3>Mais formas de acessar. Mais pessoas incluídas.</h3>
        <p>
          Buscamos tornar o Aurora simples de usar, com textos legíveis,
          navegação clara e interfaces que se adaptam a diferentes telas. Do
          botão físico ao navegador, cada parte do ecossistema é pensada para
          ampliar o acesso, inclusive para quem tem pouca familiaridade com
          tecnologia.
        </p>
      </div>
    </section>
  );
}
