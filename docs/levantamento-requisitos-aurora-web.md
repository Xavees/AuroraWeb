# Levantamento de requisitos — Aurora Web

## 1. Objetivo e escopo

O Aurora Web é a interface web do sistema Aurora, voltado à segurança pessoal e ao acompanhamento de pessoas e dispositivos. Seu objetivo é permitir que o usuário acesse e gerencie informações da sua rede de confiança, incluindo contatos, círculos, últimas localizações, dispositivos e registros de rotas e alertas.

Este levantamento foi elaborado a partir das telas, componentes e indicações de integração presentes no repositório da versão web, analisado em 14 de setembro de 2026. Os requisitos funcionais descrevem os comportamentos esperados do sistema, enquanto os requisitos não funcionais estabelecem condições de qualidade para sua implementação.

**Situação da versão analisada:** a aplicação encontra-se em estágio de protótipo de interface. A navegação, a alternância de tema e a seleção de membros no mapa demonstrativo apresentam comportamento local. As demais funcionalidades dependem, em sua maioria, de implementação e integração com serviços externos. Portanto, este documento especifica requisitos e não comprova a entrega integral das funcionalidades.

## 2. Requisitos funcionais

Na coluna “Situação”, **local** indica comportamento existente no navegador; **protótipo** indica tela ou controle disponível, sem conclusão do fluxo real; e **previsto** indica funcionalidade mencionada no código, mas ainda sem fluxo completo. Requisitos que reúnem comportamentos em estágios diferentes apresentam essa distinção na própria linha.

| Código | Requisito | Descrição | Situação |
|---|---|---|---|
| RF01 | Apresentar o sistema | O sistema deve disponibilizar uma página inicial com a proposta do Aurora, seus principais benefícios e acesso ao cadastro e à consulta de dispositivos. | Local. |
| RF02 | Cadastrar usuário | O sistema deve permitir a criação de conta mediante nome completo, e-mail, senha, confirmação da senha e aceite dos Termos de Uso e Privacidade. Deve validar os campos, a correspondência das senhas e o mínimo de oito caracteres indicado na interface. | Protótipo; validação e cadastro pendentes. |
| RF03 | Autenticar usuário | O sistema deve permitir a autenticação por e-mail e senha e oferecer a opção de manter a sessão, conforme a política de expiração definida para o sistema. | Protótipo. |
| RF04 | Recuperar acesso | O sistema deve permitir solicitar a recuperação de senha pelo e-mail cadastrado, enviar um código de verificação e permitir a definição de uma nova senha após a validação. | Solicitação e código em protótipo; definição da nova senha sem tela. |
| RF05 | Validar código de verificação | O sistema deve permitir informar e confirmar o código de quatro dígitos previsto na interface, solicitar seu reenvio e rejeitar códigos inválidos ou expirados. | Protótipo; validação, expiração e reenvio previstos. |
| RF06 | Consultar e editar perfil | O sistema deve apresentar nome, e-mail e telefone do usuário e permitir salvar alterações nesses dados. | Protótipo com dados demonstrativos. |
| RF07 | Alterar foto de perfil | O sistema deve permitir selecionar uma imagem e atualizar a foto associada ao perfil do usuário. | Controle em protótipo. |
| RF08 | Alterar senha | O sistema deve permitir que o usuário autenticado altere sua senha mediante validação de identidade. | Controle em protótipo. |
| RF09 | Excluir conta | O sistema deve permitir que o usuário solicite a exclusão de sua conta, com confirmação explícita da operação. | Controle em protótipo. |
| RF10 | Configurar notificações | O sistema deve permitir habilitar ou desabilitar o recebimento de notificações conforme as preferências do usuário. | Alternância local do controle; persistência pendente. |
| RF11 | Selecionar tema visual | O sistema deve permitir alternar entre os temas claro e escuro, manter a escolha no navegador e utilizar a preferência do dispositivo quando não houver uma escolha salva. | Local, com persistência no navegador. |
| RF12 | Consultar contatos | O sistema deve listar os contatos de emergência e apresentar o nome, a identificação visual e o estado de presença ou a última atividade disponível de cada contato. | Protótipo com dados demonstrativos. |
| RF13 | Buscar contatos | O sistema deve permitir pesquisar os contatos e apresentar os resultados correspondentes ao termo informado. | Campo em protótipo; busca pendente. |
| RF14 | Enviar solicitação de amizade | O sistema deve permitir informar o nome e um meio de identificação do contato, e-mail ou telefone, para enviar uma solicitação de amizade. | Protótipo. |
| RF15 | Consultar círculo e participantes | O sistema deve apresentar o círculo ativo, seu nome, situação e quantidade de participantes, além do nome e do papel de cada membro. | Protótipo com dados demonstrativos. |
| RF16 | Consultar a última localização de um membro | O sistema deve permitir selecionar um participante e visualizar sua última localização registrada no mapa, acompanhada do endereço e da informação de atualização. | Seleção local; mapa e localizações demonstrativos. |
| RF17 | Consultar dispositivos | O sistema deve listar os dispositivos acompanhados pelo usuário, indicando identificação, estado de conexão e informação da última atualização disponível. | Protótipo com dados demonstrativos. |
| RF18 | Adicionar dispositivo | O sistema deve permitir vincular um dispositivo autorizado à relação de dispositivos acompanhados pelo usuário. | Controle em protótipo; fluxo de vinculação pendente. |
| RF19 | Consultar locais favoritos | O sistema deve apresentar os locais favoritos associados ao usuário, identificados por nomes como Casa e Escola. | Protótipo com dados demonstrativos. |
| RF20 | Selecionar círculos de acompanhamento | O sistema deve permitir ativar ou desativar a seleção dos círculos apresentados na área de dispositivos e círculos. A integração deve definir o efeito dessa seleção sobre o acompanhamento. | Alternância local; efeito funcional e persistência pendentes. |
| RF21 | Consultar histórico | O sistema deve apresentar registros de rotas e alertas, incluindo tipo de ocorrência, descrição, data e horário. Quando disponíveis, deve exibir origem e destino das rotas e o contato relacionado ao alerta. | Protótipo com dados demonstrativos. |
| RF22 | Pesquisar e filtrar histórico | O sistema deve permitir pesquisar registros, filtrá-los pelas categorias Todos, Rotas e Alertas e consultar registros adicionais por paginação. | Busca e categorias em protótipo; paginação prevista no código. |
| RF23 | Consultar planos | O sistema deve apresentar os planos disponíveis, seus preços, benefícios e a identificação do plano atual do usuário. | Protótipo com valores e benefícios fixos. |
| RF24 | Contratar ou alterar plano | O sistema deve permitir solicitar a contratação ou troca de plano, encaminhar o pagamento quando aplicável e atualizar o plano após confirmação do serviço responsável. | Controle de assinatura em protótipo; integração prevista. |

### 2.1. Delimitações dos requisitos funcionais

A página inicial divulga localização em tempo real e alertas imediatos, mas a versão analisada apresenta somente a última localização demonstrativa e exemplos de alertas no histórico. O acionamento de SOS, o envio efetivo de notificações e a atualização contínua de localização não possuem fluxos implementados nesta versão; sua inclusão como entregas da interface web depende de definição do escopo com a equipe.

O controle denominado “Acessibilidade” ainda não define qual recurso será ativado. Por isso, não constitui um requisito funcional suficientemente especificado; as condições de acessibilidade da interface são tratadas em RNF03.

Também não foram identificados fluxos completos de criação ou exclusão de círculos, aceitação ou recusa de convites, remoção de contatos ou edição de locais favoritos. Essas operações não foram presumidas neste levantamento. O seletor temporário de telas é um recurso de demonstração do protótipo.

## 3. Requisitos não funcionais

Os requisitos abaixo são condições propostas para a evolução da versão web. Sua presença neste levantamento não significa que tenham sido implementados ou verificados. Os critérios de avaliação tornam as condições observáveis; os valores numéricos apresentados são metas propostas, sujeitas à validação pela equipe.

| Código | Requisito | Descrição e critério de avaliação proposto |
|---|---|---|
| RNF01 | Responsividade | A interface deve adaptar-se a celulares, tablets e computadores, mantendo textos, campos e ações utilizáveis. Verificar as telas em larguras de 360, 768 e 1366 pixels, sem sobreposição de conteúdo ou rolagem horizontal da página. |
| RNF02 | Usabilidade e consistência | A interface deve utilizar linguagem em português, rótulos claros e padrões consistentes de navegação, cores e controles. Formulários devem apresentar mensagens compreensíveis de sucesso, erro e preenchimento obrigatório. Verificar os fluxos com dados válidos, inválidos e campos vazios. |
| RNF03 | Acessibilidade | As funções essenciais devem ser operáveis por teclado, com foco visível, campos identificados e mensagens compreensíveis por leitor de tela. Estados não devem depender exclusivamente de cor. Verificar cadastro, login e consultas nos dois temas e com ampliação de texto de 200%. |
| RNF04 | Compatibilidade | A aplicação deve funcionar nos navegadores Chrome, Edge, Firefox e Safari adotados para homologação. A equipe deve registrar as versões testadas e verificar os fluxos essenciais em cada uma delas, incluindo o armazenamento da preferência de tema. |
| RNF05 | Controle de acesso | Dados de perfil, contatos, dispositivos, círculos e localizações devem ser acessíveis apenas a usuários autenticados e autorizados. A API deve validar a autorização em cada operação. Verificar que usuários sem sessão ou sem vínculo autorizado não consigam consultar ou alterar esses dados, inclusive por chamadas diretas à API. |
| RNF06 | Proteção da comunicação e das credenciais | Em produção, a comunicação com a API deve utilizar HTTPS. Senhas e códigos de recuperação não devem aparecer em URLs, registros de aplicação ou armazenamento persistente do navegador. Verificar as requisições, os registros e o armazenamento durante os fluxos de autenticação e recuperação. |
| RNF07 | Privacidade da localização | A consulta de localização deve respeitar a autorização de compartilhamento do participante. A revogação deve impedir consultas subsequentes. Verificar o acesso antes e depois da revogação e garantir que dados de pessoas não autorizadas não sejam retornados pela API. |
| RNF08 | Desempenho | Como meta proposta, as telas principais devem apresentar seu conteúdo inicial em até três segundos e ações exclusivamente locais devem fornecer retorno visual em até 200 milissegundos. Medir em ambiente de teste documentado, registrando dispositivo, navegador, conexão, volume de dados e dependência da API. |
| RNF09 | Tratamento de falhas | A interface deve informar falhas de conexão e do serviço, permitir nova tentativa quando aplicável e evitar indicar sucesso antes da confirmação da API. Verificar o comportamento com ausência de rede, tempo de resposta excedido e respostas de erro do servidor. |
| RNF10 | Integridade e persistência | Alterações confirmadas em perfil, vínculos e preferências de conta devem permanecer após recarregar a aplicação. Campos devem ser validados no cliente e no servidor, e operações de cadastro, convite e contratação devem evitar duplicação por envio repetido. Verificar recarregamento, reenvio e cliques consecutivos. |
| RNF11 | Clareza temporal dos dados | A interface deve distinguir a última localização conhecida de uma localização atual e exibir a informação de atualização recebida do serviço. Verificar dados antigos, dispositivos offline e ausência de localização, sem apresentar esses estados como acompanhamento em tempo real. |
| RNF12 | Manutenibilidade | A implementação deve manter componentes reutilizáveis, tipos definidos e separação entre páginas, estilos e serviços de acesso à API. A versão entregue deve concluir a compilação e a análise estática configuradas no projeto sem erros. |
| RNF13 | Integração com serviços | As chamadas à API REST devem utilizar a camada central de serviços e endereço base configurável por ambiente. Os contratos devem definir dados de entrada, retorno e erros. Verificar que a troca de ambiente não exija alteração das páginas e que falhas da API sejam tratadas de maneira consistente. |

## 4. Considerações sobre a validação

O levantamento deve ser revisado pela equipe responsável pelo TCC para confirmar o escopo final. Permanecem a definir os prazos de validade e limites de tentativas do código de verificação, a duração das sessões, o mecanismo de vinculação de dispositivos, o efeito da seleção de círculos e as regras de contratação dos planos.

A validação dos requisitos funcionais depende da conclusão dos fluxos e da integração com a API. A validação dos requisitos não funcionais exige testes específicos; o código analisado demonstra estrutura de componentes, regras de responsividade e persistência de tema, mas não comprova segurança, desempenho, compatibilidade ou acessibilidade completos.

### Base do levantamento

Foram examinados o README do projeto, o componente principal de navegação, as páginas de início, cadastro, login, recuperação, código de verificação, perfil, contatos, solicitação de amizade, círculos, dispositivos, histórico e planos, além dos componentes de formulário, das regras de responsividade e do cliente de API REST.
