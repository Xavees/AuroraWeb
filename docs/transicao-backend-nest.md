# Transição do Aurora Web para NestJS

Atualizado em 23/11/2026.

## Situação atual

O frontend continua sendo um protótipo com telas navegáveis. A preparação desta etapa não ativa login, cadastro, perfil, criação ou entrada em círculos. Não há sessão fictícia nem token gerado pelo frontend. O backend foi consultado, mas não foi alterado.

Foi removido src/services/api/authApi.ts, serviço legado sem uso nas telas que chamava POST /api/auth/login e PUT /api/auth/profile com o contrato antigo do Express. O package.json do frontend não possui dependência direta de Express.

O próprio Nest do Aurora usa o adaptador Express internamente. Isso é uma escolha do servidor e não é a antiga integração do frontend: não é necessário remover esse adaptador para conectar o Web ao Nest.

## Padrão de arquivos

Arquivos de código e CSS próprios do frontend usam nomes em português, sem acentos. Componentes e páginas usam PascalCase; configurações e serviços usam camelCase. Exemplos:

- src/Aplicacao.tsx: seleção das telas e navegação.
- src/principal.tsx: inicialização do React.
- src/pages/PaginaCriarCirculo.tsx: formulário de criação.
- src/config/etapasInicio.ts: textos e imagens do passo a passo.
- src/config/telas.ts: opções do seletor.
- src/styles/inicio.css: aparência da home.
- src/contexts/ProvedorAutenticacao.tsx: autenticação ainda pendente.
- src/services/api/autenticacaoApi.ts e circulosApi.ts: contratos Nest.

A relação completa está em [renomeacoes-arquivos.json](./renomeacoes-arquivos.json). As pastas existentes e nomes dos assets foram preservados para evitar mudanças desnecessárias. Arquivos convencionais das ferramentas, como package.json, index.html, Dockerfile, vite.config.ts e tsconfig.*, mantêm seus nomes. Identificadores de rotas como #/create-circle continuam iguais para preservar os links.

## Contratos conferidos no Aurora Backend

Fonte: projeto irmão Aurora_Back-End/aurora-backend, controllers, DTOs e casos de uso de auth e circulos.

O servidor não configura prefixo global /api. A documentação fica em /api/docs, mas as rotas abaixo não levam /api.

| Ação | Rota | Corpo / resposta |
| --- | --- | --- |
| Cadastro | POST /auth/register | Envia nome, email, senha. Retorna usuarioId e email. |
| Login | POST /auth/login | Envia email, senha. Retorna access_token, token_type e expires_in. |
| Listar círculos | GET /circulos | Bearer JWT; retorna lista de círculos. |
| Criar círculo | POST /circulos | Bearer JWT; envia somente nome. |
| Entrar no círculo | POST /circulos/entrar | Bearer JWT; envia codigoConvite. |
| Listar membros | GET /circulos/:id/membros | Bearer JWT; retorna IDs, função e data de entrada. |

Regras atuais:

- Cadastro: nome obrigatório, até 100 caracteres; email válido, até 100; senha de 12 a 128 caracteres. Telefone e confirmação de senha não fazem parte do corpo aceito.
- Login não retorna objeto user/perfil. O token expira em 900 segundos conforme o caso de uso atual. Não foi encontrado um fluxo de renovação no controller de autenticação consultado.
- IDs são strings, preservando IDs grandes do banco; datas na resposta HTTP são strings.
- Círculo: nome de 3 a 100 caracteres. O servidor define o criador como administrador e gera o código. O frontend não envia criadorId, função nem código ao criar.
- Entrada: código obrigatório com no máximo 10 caracteres. O gerador atual produz 10 caracteres hexadecimais em maiúsculas; o DTO de entrada não exige esse formato, portanto não impomos uma expressão regular adicional.
- Membros retornam funcao (ADMINISTRADOR ou MEMBRO), não papéis familiares como “pai” ou “mãe”. A resposta de membros não contém nome, coordenadas ou última localização; a tela atual precisa ser adaptada com fontes apropriadas.
- O Nest rejeita propriedades desconhecidas por forbidNonWhitelisted. Os serviços serializam explicitamente os campos aceitos.

## Cliente HTTP preparado

clienteApi.ts usa VITE_API_URL, remove barras finais duplicadas, envia Bearer apenas quando informado e preserva AbortSignal e demais opções de fetch.

Erros do Nest são lidos em message (texto ou lista), preservando o status em ErroApi. Respostas 204 são aceitas sem tentar interpretar JSON. Não existem tokens fixos, URL de produção ou restauração de sessão legada.

Os serviços ainda não são chamados pelas telas. Tipos locais de perfil e círculo continuam representando o protótipo; não devem ser usados diretamente como contratos de rede. Os tipos de resposta Nest ficam junto aos serviços.

## Configuração local

1. Inicie o Aurora Backend e seu banco pelo procedimento do repositório backend.
2. Copie .env.example para .env, se o arquivo ainda não existir.
3. Defina VITE_API_URL=http://localhost:3000 (ou o endereço real da API), sem /api.
4. Reinicie o Vite. No Compose, execute docker compose up -d para aplicar alterações de ambiente.
5. No backend, configure FRONTEND_URL com a origem usada: http://localhost:5173 para Vite local ou http://localhost:8080 para o Docker do Web.
6. Verifique /api/docs e confirme que o banco está disponível.

O backend atual permite uma origem por FRONTEND_URL. Se precisar de múltiplas origens, ajuste deliberadamente o backend; a preparação não alterou esse projeto. No celular, localhost aponta para o celular: use o IP do computador e configure a origem correspondente. O navegador não resolve nomes de serviços internos do Docker.

Variáveis VITE_* são públicas e nunca devem conter credenciais. .env permanece ignorado pelo Git.

## Próximas etapas para ativar a integração

1. Adaptar o cadastro às regras acima e conectar cadastrarUsuario.
2. Conectar realizarLogin ao ProvedorAutenticacao, definir o ciclo de sessão e tratar expiração/401. Não guardar senha; não reaproveitar o antigo formato token/user.
3. Definir como obter o perfil do usuário autenticado. O controller de usuários existente expõe GET/PATCH /usuarios/:id; conferir autorização e DTOs antes de implementar o serviço. Não assumir /auth/profile ou /auth/me.
4. Ao abrir círculos, buscar a lista com JWT. Mostrar carregamento, erro, ausência de círculos e seleção de um círculo existente como estados distintos. Atualmente a tela recebe null por padrão.
5. Conectar criação/entrada, aguardar sucesso real e atualizar a lista. Em erro, manter o formulário e mostrar a mensagem; nunca cadastrar localmente para simular sucesso.
6. Adaptar membros e localização ao contrato real antes de substituir o desenho demonstrativo.
7. Inventariar endpoints de contatos, histórico e áreas de risco antes de conectar essas telas. Planos e recuperação de senha continuam fora desta preparação.
8. Fazer teste integrado: cadastro → login → criar círculo → entrar com outra conta → listar membros; testar 400, 401, 403, código inválido, indisponibilidade e expiração.

## Validação desta etapa

Verificações de TypeScript, lint e build devem passar após as renomeações. O cliente HTTP é verificado com respostas simuladas de sucesso, erro Nest e 204; isso não substitui testes contra o Nest e o banco reais.

Para repetir a validação do cliente: `node --test testes/cliente-api.test.mjs`. Para os demais checks: `npm run lint` e `npm run build`.

## Atualização: login conectado

O cadastro foi conectado em etapa posterior à preparação inicial. Agora o login também chama POST /auth/login e, em seguida, GET /usuarios/:id com Bearer. O ID vem de sub do JWT apenas para compor a URL; a autorização e a assinatura são verificadas pelo Nest. A sessão só é ativada depois da consulta autenticada ao perfil.

O token é salvo em sessionStorage por padrão; “Manter conectado” usa localStorage. Nenhuma senha é persistida. Ao recarregar, o perfil é validado novamente no servidor. A expiração considera o menor prazo entre exp e expires_in; não existe renovação automática. Sair remove a sessão local, mas não revoga o JWT no servidor.

Arquivos: services/sessao.ts, services/api/usuariosApi.ts, contexts/ProvedorAutenticacao.tsx e pages/PaginaLogin.tsx. Edição do perfil e integração das outras funcionalidades permanecem pendentes. Para validar os testes locais: node --test testes/*.test.mjs.

Validação manual: entrar com uma conta existente, conferir nome/e-mail no perfil, recarregar e sair; repetir com senha inválida e API indisponível. O teste com credenciais reais deve ser feito pelo usuário; os testes automatizados usam dados simulados.

## Alterações incorporadas dos patches

Os arquivos aurora-web-cadastro.patch e aurora-api-cors.patch foram conferidos e removidos após confirmar que suas alterações já estavam no código. Não é necessário aplicar patches para executar os projetos.

- Frontend: src/pages/PaginaCadastro.tsx contém o formulário integrado; src/services/api/autenticacaoApi.ts envia POST /auth/register.
- Backend: Aurora_Back-End/aurora-backend/src/main.ts configura app.enableCors antes de app.listen, usando FRONTEND_URL.
- Endereço da API no frontend: VITE_API_URL no .env local (não versionado).


## Atualização: edição de perfil e foto por URL

A tela de perfil agora envia PATCH /usuarios/:id autenticado. Nome: 2–100 caracteres; telefone, quando alterado: 10–15 dígitos com + opcional. Foto: link HTTPS de até 255 caracteres. E-mail é somente leitura porque não integra AtualizarUsuarioDto. Campos opcionais inalterados são omitidos; remover telefone/foto não foi habilitado.

O perfil e a foto são atualizados com a resposta real da API. Imagens inacessíveis exibem a inicial do usuário. Ainda não existe upload de arquivo no backend consultado: selecionar uma foto do computador exige implementar armazenamento e endpoint próprios. Não usamos base64 ou armazenamento local para simular persistência da foto.

## Upload implementado na branch codex/upload-foto-perfil

Meu perfil agora permite selecionar JPG, PNG ou WebP de até 5 MB, visualizar uma prévia, cancelar e salvar a foto. O envio é autenticado por POST /usuarios/eu/foto com multipart/form-data. O navegador define o boundary; o cliente não força JSON para FormData.

O backend valida e converte a imagem com Sharp para WebP de até 512x512 e 25 megapixels de entrada. Os arquivos ficam em uploads/perfis, persistente através da pasta compartilhada do Dev Container. O banco guarda o caminho relativo; o Web o resolve contra VITE_API_URL. Não há migração de banco. Instale as dependências e reinicie o Nest após atualizar o código.

As fotos são públicas por URL aleatória. Fotos antigas são preservadas nesta versão; programe limpeza e backup da pasta junto com o banco. A pasta uploads não deve entrar no Git. Veja o README do backend para configuração de UPLOAD_DIR.
