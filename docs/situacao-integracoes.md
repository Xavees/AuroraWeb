# Situação das integrações — 24/11/2026

Esta revisão descreve o código atual, não certifica todos os requisitos do TCC. O levantamento antigo contém requisitos retirados (dispositivos e OTP) e regras anteriores à API Nest.

## Círculos

Conectados: listar e selecionar círculos, criar, entrar por código, listar membros, mostrar/copiar convite, renomear, renovar convite, alterar função de outro participante, remover membro, desbloquear por ID, sair e desativar. Ações administrativas só aparecem para ADMINISTRADOR; a autorização definitiva continua no Nest. Operações destrutivas pedem confirmação.

A lista vazia leva à entrada por código. Falhas de rede não são tratadas como ausência de círculos. Os dados são recarregados após as operações. Não há sucesso fictício.

Limitações: membros retornam usuarioId, função e data de entrada, mas não nome/foto/localização. O próprio usuário aparece com nome; os demais, com ID. Não tentamos GET /usuarios/:id de terceiros, pois a API proíbe isso. Não existe listagem de bloqueados no controller consultado, então desbloqueio exige ID. Localização dos membros ainda não integrada.

## Visão geral do frontend

| Área | Situação |
| --- | --- |
| Home, tema e navegação | Implementados localmente; acesso às funcionalidades exige sessão |
| Cadastro e login | Conectados à API |
| Sessão | Persistência, expiração e saída locais; sem refresh token |
| Perfil e foto | Consulta, edição permitida e upload conectados; email somente leitura |
| Círculos | Gestão conectada nesta etapa; localização e identificação completa dos membros pendentes |
| Contatos de confiança e convites | Interface demonstrativa, sem integração |
| Histórico de localização | Filtros locais, sem busca de registros na API |
| Mapa de risco | Mapa base; áreas de risco ainda não carregadas da API |
| Recuperar/alterar senha e excluir conta | Ainda não conectados |
| Planos | Interface; contratação e pagamento não conectados |
| Notificações e acessibilidade | Controles não comprovam implementação funcional |
| Avaliação comunitária e alertas SOS | Não entregues como fluxos completos no Web |
| Dispositivos e OTP | Retirados do escopo por decisão do usuário |

Validação desta etapa: build/lint e testes de contratos simulados. Ainda é necessário teste integrado com duas contas reais para criação, convite, administração e saída. Nenhum dado de conta real foi alterado para validar os contratos. Requisitos não funcionais de acessibilidade, segurança e desempenho exigem avaliação própria.

## Organização das telas de círculos

A página Círculos mostra apenas os nomes dos círculos e as opções de entrar/criar. Os detalhes abrem em #/circles?id=ID, com consulta GET /circulos/:id e membros. Administração fica em painel expansível. Sair/desativar retorna à listagem. As 12 rotas do controller de círculos agora têm chamadas na interface; validação integrada com contas reais continua necessária.


### Desbloqueio por e-mail (24/11/2026)

A administração do círculo agora pede o e-mail, não o ID. O frontend chama
`POST /circulos/:id/bloqueios/desbloquear-por-email` com `{ "email": "usuario@exemplo.com" }`
e o token da sessão. O Nest valida o e-mail e, dentro da transação, verifica se o
solicitante é administrador antes de resolver o e-mail para o ID. A remoção do
bloqueio continua usando o ID e fica restrita ao círculo informado.

A resposta de sucesso é 204. E-mail inexistente ou sem bloqueio produz a mesma
resposta 404; não há consulta pública de usuários. O desbloqueio não adiciona o
usuário ao círculo. A rota antiga por ID foi preservada para outros clientes.
É necessário executar o backend atualizado para usar este formulário.

Arquivos principais: `src/pages/PaginaDetalhesCirculo.tsx` e
`src/services/api/circulosApi.ts` no web; controller de círculos, DTO
`desbloquear-por-email.dto.ts`, caso de uso e repositório transacional de desbloqueio
no backend. Testes automatizados cobrem o contrato web, a autorização antes da
consulta e a resolução do e-mail. O fluxo real com duas contas ainda precisa ser
validado no ambiente integrado.

### Duração do login e ícones (24/11/2026)

A sessão passou de 15 minutos para 8 horas (28.800 segundos). No backend, a
constante `DURACAO_SESSAO_SEGUNDOS`, em
`src/modules/auth/application/services/duracao-sessao.ts`, é compartilhada pela
assinatura JWT e pelo campo `expires_in` da resposta de login. O frontend continua
respeitando a validade recebida da API, sem prolongar tokens expirados.

Após reiniciar o backend, é necessário sair e entrar novamente para receber um
novo token com a duração ampliada. Tokens já emitidos conservam a validade antiga.
A opção de manter conectado continua controlando a persistência entre sessões do
navegador; não altera a duração do token.

Os ícones `entrarSVG.png` e `criarSVG.png` aparecem nas opções da tela Círculos,
e `historicoLocalsVG.png` substitui o ícone anterior no histórico de localização.

### Histórico de localização conectado (24/11/2026)

A tela `src/pages/PaginaHistoricoLocalizacao.tsx` consulta os dados reais da conta
pela camada `src/services/api/historicoLocalizacaoApi.ts`:

- `GET /historico-localizacao/me`: lista paginada (20 registros), com filtros
  opcionais `dataInicio` e `dataFim` e navegação entre páginas.
- `GET /historico-localizacao/me/:id`: detalhes do registro selecionado.

As duas rotas do módulo estão representadas no frontend. O token identifica o
usuário; o cliente não envia um ID de usuário para consultar outras contas.
Os filtros incluem dias inteiros no fuso do navegador, convertidos para ISO com
fuso explícito. A tela tem carregamento, erro com nova tentativa, vazio e
cancelamento das consultas ao sair ou trocar os filtros.

A API não retorna nome/endereço dos locais. Por isso a busca por nome foi
substituída pelo período e os registros mostram coordenadas, horário GPS,
recebimento, altitude e velocidade (campos ausentes são indicados). Um link
opcional abre o ponto no OpenStreetMap. Não foi adicionado rastreamento nem envio
de localização: este módulo do backend oferece somente consulta. Os registros
precisam existir na conta para aparecer. Nenhuma alteração de backend foi necessária.

Os testes de contrato cobrem autenticação, IDs grandes, paginação e conversão de
datas, incluindo períodos inválidos. A consulta com uma conta real contendo
registros ainda precisa ser validada no ambiente integrado.
