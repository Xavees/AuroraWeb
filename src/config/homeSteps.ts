type EtapaInicio = {
  id: string;
  titulo: string;
  descricao: string;
  imagem?: { src: string; alt: string };
};

// Para adicionar uma imagem, preencha imagem com o src importado e seu texto alt.
export const etapasInicio: EtapaInicio[] = [
  {
    id: "conta",
    titulo: "Crie sua conta",
    descricao:
      "Comece com seus dados e prepare seu perfil. Sua conta é o primeiro passo para reunir pessoas de confiança e acompanhar o que importa para você.",
  },
  {
    id: "circulo",
    titulo: "Crie seu círculo e adicione pessoas",
    descricao:
      "Convide familiares e amigos para fazer parte da sua rede. Organize seus círculos e escolha com quem compartilhar os momentos do dia a dia.",
  },
  {
    id: "avaliacoes",
    titulo: "Ajude a mapear locais seguros e iluminados",
    descricao:
      "Compartilhe sua percepção sobre a segurança e a iluminação dos lugares por onde passa. Suas avaliações ajudam a comunidade a conhecer melhor a região.",
  },
  {
    id: "localizacao",
    titulo: "Veja sua família em tempo real",
    descricao:
      "Acompanhe no mapa a localização dos familiares que compartilham essa informação com você. Fique por perto, mesmo quando cada um estiver em um lugar.",
  },
  {
    id: "cadastro-dispositivos",
    titulo: "Cadastre seus dispositivos",
    descricao:
      "Reúna seus dispositivos na mesma conta, incluindo o Localizador de Segurança Aurora. O dispositivo embarcado amplia as formas de acompanhamento e de acionamento do SOS.",
  },
  {
    id: "consulta-dispositivos",
    titulo: "Saiba onde seus dispositivos estão",
    descricao:
      "Consulte os dispositivos cadastrados, confira seu estado de conexão e veja a última localização disponível. Tenha as informações de acompanhamento em um só lugar.",
  },
  {
    id: "favoritos",
    titulo: "Salve seus lugares favoritos",
    descricao:
      "Deixe casa, trabalho e outros endereços importantes sempre à mão. Organize os lugares da sua rotina para encontrá-los com mais facilidade no mapa.",
  },
  {
    id: "contatos",
    titulo: "Escolha seus contatos de emergência",
    descricao:
      "Defina quem faz parte da sua rede de apoio. Esses contatos poderão receber seus alertas quando você acionar o SOS pelo aplicativo ou pelo dispositivo embarcado.",
  },
  {
    id: "trajetos",
    titulo: "Planeje seus próximos trajetos",
    descricao:
      "Consulte o mapa colaborativo e as informações sobre áreas de risco antes de sair. Use as contribuições da comunidade para avaliar alternativas no seu caminho.",
  },
  {
    id: "historico",
    titulo: "Consulte seu histórico de rotas e alertas",
    descricao:
      "Reveja os trajetos registrados e os alertas da sua conta. Consulte datas e horários para entender o que aconteceu e acompanhar sua rotina.",
  },
];
