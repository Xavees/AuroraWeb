const duvidas = [
  {
    pergunta: "Preciso do dispositivo Aurora para usar o aplicativo?",
    resposta:
      "O Localizador Aurora foi pensado como um complemento ao aplicativo. A proposta é permitir o uso do Mobile e do Web sem o dispositivo físico, que acrescenta outra forma de acompanhar a localização e acionar o SOS.",
  },
  {
    pergunta: "Quem pode ver minha localização?",
    resposta:
      "A proposta do Aurora é compartilhar sua localização com as pessoas da sua rede de confiança que você autorizar. Fazer parte de um círculo não deve substituir essa autorização. Os controles de compartilhamento serão disponibilizados junto com o recurso.",
  },
  {
    pergunta: "Qual a diferença entre o Aurora Mobile e o Web?",
    resposta:
      "O Mobile é pensado para Android e para acompanhar você durante os deslocamentos, com mapa, localização compartilhada e acesso ao SOS. O Web permite acessar pelo navegador as ferramentas de acompanhamento e gestão da sua conta, em uma interface adaptada a diferentes telas.",
  },
  {
    pergunta: "O localizador precisa estar conectado ao celular ou à internet?",
    resposta:
      "O projeto prevê integração com o aplicativo por Bluetooth ou Wi-Fi. O GPS identifica a posição, mas o envio de localização e alertas depende de uma conexão disponível. O localizador não foi projetado para transmitir essas informações sozinho, sem conectividade.",
  },
];

export function HomeFaq() {
  return (
    <section className="home-faq" aria-labelledby="home-faq-title">
      <header className="home-faq-heading">
        <span className="eyebrow">TIRE SUAS DÚVIDAS</span>
        <h2 id="home-faq-title">Principais dúvidas</h2>
        <p>
          Entenda como as diferentes partes do Aurora se conectam à sua rotina.
        </p>
      </header>
      <div className="home-faq-list">
        {duvidas.map(({ pergunta, resposta }) => (
          <details className="home-faq-item" key={pergunta}>
            <summary>
              {pergunta}
              <span className="home-faq-icon" aria-hidden="true" />
            </summary>
            <p>{resposta}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
