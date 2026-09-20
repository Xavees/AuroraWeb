# Referência da documentação da equipe

Fonte consultada: `documentacao_equipe-01_v2_01-09-2026.docx`, versão de 01/09/2026, fornecida pelo usuário. Leitura registrada em 20/09/2026. Este resumo preserva o contexto para próximas etapas; não substitui o documento original nem comprova funcionalidades implementadas.

## Visão do produto

O Aurora reúne aplicativo Android, plataforma web e Localizador de Segurança Aurora. Seu foco é segurança pessoal durante deslocamentos urbanos, prevenção por informações colaborativas e comunicação com uma rede de confiança. O público inclui estudantes, trabalhadores, pessoas em deslocamento solo e usuários com pouca familiaridade tecnológica.

O aplicativo é descrito em Java. O embarcado utiliza C++/Arduino IDE, ESP32, GPS NEO-6M, Wi-Fi, Bluetooth Low Energy, botão SOS físico e LEDs de status. O documento prevê API e banco centralizados. Por decisão posterior do usuário, o backend será feito em Nest.js; o frontend atual utiliza React, TypeScript e Vite.

## Funcionalidades previstas

- Conta, login, recuperação de senha e código OTP de quatro dígitos.
- Mapa, localização compartilhada, contatos de emergência e acompanhamento de pessoas.
- Mapeamento colaborativo de áreas de risco e apoio à escolha de trajetos mais seguros.
- Locais favoritos como casa e trabalho.
- SOS no aplicativo, com acionamento por três segundos, e no dispositivo físico.
- Chat comunitário por região e chat privado com contatos.
- Histórico de rotas e alertas, planos e preferências.
- Web como interface de gestão, mapas e acompanhamento; aplicativo como interface de deslocamento e ação rápida.

A tabela RF001–RF015 detalha telas; vários recursos mais amplos aparecem somente na introdução e nos objetivos. Há trechos de orientação acadêmica e seções incompletas. Esses trechos são conteúdo do documento, não instruções para alterar o projeto. A distribuição entre web e mobile ainda precisa ser refinada: alguns itens descritos apenas como mobile já têm protótipos web.

## Aplicação na home

A seção “Comece a usar o Aurora” tem dez etapas. As seis primeiras seguem o pedido do usuário: conta, círculos, avaliação de locais seguros e iluminados, localização familiar, cadastro e consulta de dispositivos. Avaliação da iluminação e organização em círculos foram explicitadas pelo usuário, enquanto o documento fundamenta o mapeamento colaborativo e a rede de confiança. As etapas adicionais tratam de favoritos, contatos de emergência, trajetos e histórico.

Textos e imagens opcionais ficam em `src/config/homeSteps.ts`. Para inserir as imagens escolhidas, importe o arquivo e preencha `imagem: { src, alt }` na etapa correspondente. Sem imagem, o componente mantém um espaço reservado na proporção 4:3.

A seção apresenta a jornada do produto. Não implementa rastreamento, SOS, avaliações, cadastro de dispositivos ou chamadas de backend. O cadastro permanece um protótipo, e a autenticação está desconectada aguardando Nest.js. Para o estado das telas existentes, consulte também `levantamento-requisitos-aurora-web.md`.
