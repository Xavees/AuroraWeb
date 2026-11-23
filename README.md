# 🚨 Aurora Web

Versão web do **Aurora**, projeto desenvolvido como parte de um Trabalho de Conclusão de Curso (TCC) voltado para **segurança pessoal e monitoramento**.

Este repositório contém uma nova implementação da aplicação web utilizando **React e TypeScript**, substituindo a versão inicial desenvolvida com HTML e CSS puro.

---

## 📚 Sobre o projeto

O **Aurora** tem como objetivo desenvolver uma solução tecnológica voltada à segurança pessoal, utilizando recursos de localização e comunicação para auxiliar usuários no acompanhamento e gerenciamento de situações de risco.

A versão web será responsável por disponibilizar uma interface para acesso e gerenciamento de informações do sistema Aurora.

> 🚧 **Projeto em desenvolvimento:** esta versão está sendo reconstruída utilizando React e TypeScript. Funcionalidades e estrutura poderão sofrer alterações durante o desenvolvimento.

---

## 💻 Tecnologias

Atualmente, o projeto utiliza:

* **React**
* **TypeScript**
* **Vite**
* **CSS**
* **ESLint**
* **Nest.js**
* **Docker**

Novas tecnologias poderão ser adicionadas conforme o desenvolvimento avançar.

---

## 📁 Estrutura inicial

```text
aurora-web/
├── public/
├── src/
│   ├── assets/
│   ├── Aplicacao.tsx
│   ├── estilosGlobais.css
│   └── principal.tsx
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

A estrutura será expandida conforme novos componentes, páginas, serviços e funcionalidades forem implementados.

---

## ⚙️ Executando o projeto

Clone o repositório:

```bash
git clone <https://github.com/Xavees/AuroraWeb>
```

Entre na pasta:

```bash
cd aurora-web
```

Instale as dependências:

```bash
npm install
```

Execute o ambiente de desenvolvimento:

```bash
npm run dev
```

O Vite exibirá no terminal o endereço local para acessar a aplicação.

O frontend está sem integração de autenticação e perfil com o backend. As telas permanecem disponíveis, mas entrar e salvar o perfil exibem uma mensagem de indisponibilidade, sem enviar requisições ou restaurar sessões antigas. A integração será implementada com o backend Nest.js. O cliente HTTP genérico em `src/services/api/clienteApi.ts` está reservado para essa etapa e exige `VITE_API_URL`, sem endereço padrão; configurar essa variável por si só não ativa login ou perfil.

---

## 🎯 Objetivos da versão Web

Entre os objetivos planejados para o desenvolvimento estão:

* Criar uma interface moderna utilizando React;
* Utilizar TypeScript para maior segurança e organização do código;
* Desenvolver componentes reutilizáveis;
* Integrar a interface com os serviços do ecossistema Aurora;
* Exibir e gerenciar informações relacionadas à segurança;
* Trabalhar com informações de localização e áreas de risco;
* Implementar autenticação de usuários;
* Tornar a aplicação responsiva.

---

## 🌐 Projeto Aurora

O **Aurora Web** faz parte de um projeto maior que envolve diferentes componentes e plataformas.

Esta implementação está sendo desenvolvida separadamente com foco específico na experiência web e na aplicação prática de tecnologias modernas de desenvolvimento Front-End.

---

## 👨‍💻 Desenvolvimento

Desenvolvido por **Equipe 01**.

Projeto acadêmico e de estudos voltado à aplicação prática de conceitos de **Engenharia de Software, desenvolvimento Web e TypeScript**.


## Docker para desenvolvimento e apresentação

O ambiente segue o backend: Node 22 (Debian Bookworm), arquivos compartilhados e suporte a Dev Containers. Aqui o Vite inicia automaticamente; no backend, o container aguarda o comando para iniciar o Nest. O frontend não precisa de banco próprio.

### Iniciar em outro computador

Instale e abra o Docker Desktop no modo de containers Linux. Copie ou clone o projeto e execute na pasta dele:

```bash
docker compose up -d --build
```

Abra http://localhost:8080. Não precisa instalar Node no computador. A primeira execução precisa de internet para baixar a imagem e as dependências. Mapas e serviços externos também precisam de conexão: prepare e teste o computador antes da apresentação.

Edite os arquivos normalmente: o Vite atualiza o navegador automaticamente. As dependências Linux ficam em um volume separado do node_modules do Windows. A cada início, npm ci sincroniza as dependências com package-lock.json; aguarde o Vite ficar pronto nos logs.

```bash
# Ver a inicialização; Ctrl+C apenas sai dos logs
docker compose logs -f web

# Parar, preservando arquivos e volumes
docker compose down

# Iniciar novamente
docker compose up -d

# Após alterar package.json e package-lock.json
docker compose restart web

# Verificar o projeto dentro do container
docker compose exec web npm run lint
docker compose exec web npm run build
```

### Usar pelo VS Code, como no backend

Instale a extensão **Dev Containers**, abra a pasta e execute **Dev Containers: Reopen in Container** na paleta de comandos. O VS Code usa o mesmo serviço web do Compose. O site inicia automaticamente em http://localhost:8080; não execute outro npm run dev nesse container. Fechar a sessão para o serviço; para voltar, reabra pelo VS Code ou inicie pelo terminal.

### Porta, celular e futura API

Os padrões funcionam sem .env. Para personalizar, copie .env.example para .env, sem sobrescrever um arquivo existente:

```powershell
Copy-Item .env.example .env
```

- WEB_PORT=8080: porta no computador; altere se estiver ocupada.
- WEB_HOST=127.0.0.1: acesso pelo próprio computador. Para demonstrar num celular na mesma rede, use WEB_HOST=0.0.0.0, permita a porta no firewall da rede privada e abra http://IP-DO-COMPUTADOR:8080 no celular. O GPS do navegador pode exigir HTTPS.
- VITE_API_URL=: deixe vazia enquanto não houver integração. Futuramente use uma URL acessível pelo navegador, como http://localhost:3000. No celular, use o IP do computador da API; localhost no celular aponta para o próprio celular. O backend deverá permitir a origem do frontend via CORS.

Após mudar .env, execute docker compose up -d para aplicar os valores. Variáveis VITE_* são públicas: não coloque senhas nelas. Configurar a URL não implementa os fluxos de integração pendentes.

### Organização

- Dockerfile: prepara o Node e inicia o Vite.
- compose.yaml: compartilha o código, separa dependências em volumes e publica a porta.
- .devcontainer/devcontainer.json: permite desenvolver dentro do Docker pelo VS Code.
- .dockerignore: exclui arquivos locais desnecessários da construção da imagem.
- .env.example: modelo das configurações opcionais.

O Docker padroniza o ambiente. As funcionalidades e a integração com o backend continuam dependendo do código. Esta configuração atende ao desenvolvimento e à demonstração do TCC.

Referências: [servidor do Vite](https://vite.dev/config/server-options) e [Dev Containers com Compose](https://code.visualstudio.com/docs/devcontainers/create-dev-container#_use-docker-compose).

## Transição para o NestJS

Consulte [a documentação da transição](docs/transicao-backend-nest.md) para os contratos da API, padrão de nomes em português, configuração local e próximos passos. Os serviços estão preparados; as telas ainda não estão integradas.

