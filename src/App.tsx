import { useEffect, useState, type ReactNode } from "react";
import "./App.css";

// -----------------------------------------------------------------------------
// Tipos e configurações de navegação
// -----------------------------------------------------------------------------

// Lista todas as telas disponíveis no protótipo.
type Screen =
  | "home"
  | "login"
  | "signup"
  | "forgot"
  | "otp"
  | "contacts"
  | "friend-request"
  | "history"
  | "devices"
  | "plans"
  | "profile";

// Define os dois temas visuais disponíveis no protótipo.
type Theme = "light" | "dark";
const screenNames: Record<Screen, string> = {
  home: "Início",
  login: "Login",
  signup: "Criar conta",
  forgot: "Esqueci a senha",
  otp: "Código OTP",
  contacts: "Contatos",
  "friend-request": "Solicitação de amizade",
  history: "Histórico",
  devices: "Dispositivos",
  plans: "Planos",
  profile: "Meu perfil",
};

// Controla a tela ativa e monta a estrutura global da aplicação.
function App() {
  const [screen, setScreen] = useState<Screen>(() => {
    // AQUI VOCÊ VAI DESENVOLVER: substitua esta navegação simples por React Router.
    const selected = window.location.hash.replace("#/", "") as Screen;
    return selected in screenNames ? selected : "home";
  });

  const [theme, setTheme] = useState<Theme>(() => {
    // Usa primeiro a escolha salva; caso não exista, respeita o tema do sistema.
    const savedTheme = localStorage.getItem("aurora-theme") as Theme | null;

    if (savedTheme === "light" || savedTheme === "dark") {
      return savedTheme;
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  useEffect(() => {
    // Aplica o tema no HTML e salva a preferência apenas neste navegador.
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("aurora-theme", theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((currentTheme) => (currentTheme === "light" ? "dark" : "light"));
  }

  function navigate(next: Screen) {
    // AQUI VOCÊ VAI DESENVOLVER: conecte a navegação às rotas reais da aplicação.
    setScreen(next);
    window.location.hash = `/${next}`;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  return (
    <div className="app">
      <Header navigate={navigate} theme={theme} toggleTheme={toggleTheme} />
      <main className="main-content">
        <ScreenPreview
          screen={screen}
          navigate={navigate}
          theme={theme}
          toggleTheme={toggleTheme}
        />
      </main>
      <Footer />
      <label className="screen-picker">
        <span>Visualizar tela</span>
        <select
          value={screen}
          onChange={(e) => navigate(e.target.value as Screen)}
        >
          {Object.entries(screenNames).map(([value, label]) => (
            <option value={value} key={value}>
              {label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Estrutura compartilhada
// -----------------------------------------------------------------------------

// Cabeçalho exibido em todas as telas, com atalhos de acesso e perfil.
function Header({
  navigate,
  theme,
  toggleTheme,
}: {
  navigate: (s: Screen) => void;
  theme: Theme;
  toggleTheme: () => void;
}) {
  return (
    <header className="site-header">
      <button className="logo" onClick={() => navigate("home")}>
        <span className="logo-mark">A</span>
        <span>Aurora</span>
      </button>
      <nav className="header-actions">
        <button className="text-button" onClick={() => navigate("login")}>
          Entrar
        </button>
        <button className="primary small" onClick={() => navigate("signup")}>
          Criar conta
        </button>
        <button
          className="icon-button"
          onClick={() => navigate("profile")}
          aria-label="Meu perfil"
        >
          ♙
        </button>
        <button
          className="icon-button"
          onClick={toggleTheme}
          aria-label={
            theme === "light" ? "Ativar modo escuro" : "Ativar modo claro"
          }
          title={theme === "light" ? "Ativar modo escuro" : "Ativar modo claro"}
        >
          {theme === "light" ? "☾" : "☀"}
        </button>
      </nav>
    </header>
  );
}
// Rodapé institucional exibido em todas as telas.
function Footer() {
  return (
    <footer className="site-footer">
      <div className="logo footer-logo">
        <span className="logo-mark">A</span>
        <span>Aurora</span>
      </div>
      <p>© 2026 Aurora. Todos os direitos reservados.</p>
    </footer>
  );
}

// Seleciona qual tela deve ser renderizada de acordo com a navegação atual.
function ScreenPreview({
  screen,
  navigate,
  theme,
  toggleTheme,
}: {
  screen: Screen;
  navigate: (s: Screen) => void;
  theme: Theme;
  toggleTheme: () => void;
}) {
  switch (screen) {
    case "login":
      return <Login navigate={navigate} />;
    case "signup":
      return <Signup navigate={navigate} />;
    case "forgot":
      return <ForgotPassword navigate={navigate} />;
    case "otp":
      return <Otp />;
    case "contacts":
      return <Contacts navigate={navigate} />;
    case "friend-request":
      return <FriendRequest navigate={navigate} />;
    case "history":
      return <History />;
    case "devices":
      return <Devices />;
    case "plans":
      return <Plans navigate={navigate} />;
    case "profile":
      return (
        <Profile navigate={navigate} theme={theme} toggleTheme={toggleTheme} />
      );
    default:
      return <Home navigate={navigate} />;
  }
}

// -----------------------------------------------------------------------------
// Página inicial
// -----------------------------------------------------------------------------

// Apresenta a proposta do Aurora e seus principais benefícios.
function Home({ navigate }: { navigate: (s: Screen) => void }) {
  return (
    <div className="home-page">
      <section className="home-hero">
        <div>
          <span className="eyebrow">SEGURANÇA QUE APROXIMA</span>
          <h1>Cuide de quem importa, onde estiver.</h1>
          <p>
            Monitore dispositivos, compartilhe rotas e mantenha sua rede de
            confiança sempre por perto.
          </p>
          <div className="hero-actions">
            <button className="primary" onClick={() => navigate("signup")}>
              Começar agora
            </button>
            <button className="secondary" onClick={() => navigate("devices")}>
              Ver dispositivos
            </button>
          </div>
        </div>
        <div className="hero-visual">
          <div className="map-grid" />
          <div className="pulse pulse-one" />
          <div className="pulse pulse-two" />
          <div className="phone-mock">
            <div className="phone-map">⌖</div>
            <strong>Você está seguro</strong>
            <small>Localização compartilhada</small>
          </div>
        </div>
      </section>
      <section className="feature-row">
        <article>
          <span>⌖</span>
          <h2>Localização em tempo real</h2>
          <p>Acompanhe as pessoas da sua rede quando elas precisarem.</p>
        </article>
        <article>
          <span>♢</span>
          <h2>Alertas rápidos</h2>
          <p>Receba notificações e sinais de emergência imediatamente.</p>
        </article>
        <article>
          <span>◎</span>
          <h2>Círculos de confiança</h2>
          <p>Organize família e amigos em grupos privados e seguros.</p>
        </article>
      </section>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Autenticação e recuperação de acesso
// -----------------------------------------------------------------------------

// Estrutura visual reutilizada pelas telas de autenticação.
function AuthCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <section className="auth-card">
      <div className="auth-heading">
        <span className="mini-mark">A</span>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
      {children}
    </section>
  );
}
// Formulário de entrada do usuário.
function Login({ navigate }: { navigate: (s: Screen) => void }) {
  return (
    <AuthCard
      title="Boas-vindas de volta"
      subtitle="Entre para acessar sua rede Aurora."
    >
      <form className="form" onSubmit={(e) => e.preventDefault()}>
        <Field label="E-mail" type="email" placeholder="voce@exemplo.com" />
        <Field label="Senha" type="password" placeholder="Sua senha" />
        <div className="form-between">
          <Check label="Manter conectado" />
          <button
            className="link"
            type="button"
            onClick={() => navigate("forgot")}
          >
            Esqueci a senha
          </button>
        </div>
        {/* AQUI VOCÊ VAI DESENVOLVER: autenticação e validação do login. */}
        <button className="primary wide">Entrar</button>
        <p className="form-note">
          Ainda não tem conta?{" "}
          <button
            className="link"
            type="button"
            onClick={() => navigate("signup")}
          >
            Cadastre-se
          </button>
        </p>
      </form>
    </AuthCard>
  );
}
// Formulário para criação de uma nova conta.
function Signup({ navigate }: { navigate: (s: Screen) => void }) {
  return (
    <AuthCard
      title="Crie sua conta"
      subtitle="Comece agora a proteger quem você ama."
    >
      <form className="form" onSubmit={(e) => e.preventDefault()}>
        <Field label="Nome completo" placeholder="Seu nome" />
        <Field label="E-mail" type="email" placeholder="voce@exemplo.com" />
        <Field
          label="Senha"
          type="password"
          placeholder="Mínimo de 8 caracteres"
        />
        <Field
          label="Confirme a senha"
          type="password"
          placeholder="Repita sua senha"
        />
        <Check label="Li e aceito os Termos de Uso e Privacidade" />
        {/* AQUI VOCÊ VAI DESENVOLVER: cadastro, regras de senha e termos. */}
        <button className="primary wide">Criar minha conta</button>
        <p className="form-note">
          Já possui uma conta?{" "}
          <button
            className="link"
            type="button"
            onClick={() => navigate("login")}
          >
            Entrar
          </button>
        </p>
      </form>
    </AuthCard>
  );
}
// Solicita o e-mail usado na recuperação de senha.
function ForgotPassword({ navigate }: { navigate: (s: Screen) => void }) {
  return (
    <AuthCard
      title="Esqueceu sua senha?"
      subtitle="Informe seu e-mail e enviaremos um código de verificação."
    >
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          navigate("otp");
        }}
      >
        <Field label="E-mail" type="email" placeholder="voce@exemplo.com" />
        {/* AQUI VOCÊ VAI DESENVOLVER: envio real do código de recuperação. */}
        <button className="primary wide">Enviar código</button>
        <button
          className="link centered"
          type="button"
          onClick={() => navigate("login")}
        >
          ← Voltar para o login
        </button>
      </form>
    </AuthCard>
  );
}
// Recebe o código de quatro dígitos enviado ao usuário.
function Otp() {
  return (
    <AuthCard
      title="Código de verificação"
      subtitle="Digite o código de 4 dígitos enviado para seu e-mail."
    >
      <form className="form" onSubmit={(e) => e.preventDefault()}>
        <div className="otp-row">
          {[1, 2, 3, 4].map((n) => (
            <input
              key={n}
              inputMode="numeric"
              maxLength={1}
              aria-label={`Dígito ${n}`}
            />
          ))}
        </div>
        {/* AQUI VOCÊ VAI DESENVOLVER: validação, expiração e reenvio do OTP. */}
        <button className="primary wide">Confirmar código</button>
        <button className="link centered" type="button">
          Reenviar código
        </button>
      </form>
    </AuthCard>
  );
}

// -----------------------------------------------------------------------------
// Contatos, histórico e monitoramento
// -----------------------------------------------------------------------------

// Exibe a rede de contatos de emergência e seus status.
function Contacts({ navigate }: { navigate: (s: Screen) => void }) {
  const names = ["Mariana Alves", "Lucas Ferreira", "Carlos Souza"];
  return (
    <PageCard
      title="Contatos"
      subtitle="Pessoas selecionadas para casos de emergência."
      icon="♙"
    >
      <Search />
      <div className="list">
        {names.map((name, i) => (
          <div className="contact-row" key={name}>
            <Avatar name={name} />
            <div>
              <strong>{name}</strong>
              <small>{i === 2 ? "Offline há 20 min" : "Online agora"}</small>
            </div>
            <span className={i === 2 ? "presence offline" : "presence"} />
          </div>
        ))}
      </div>
      <button
        className="primary wide"
        onClick={() => navigate("friend-request")}
      >
        + Adicionar contato
      </button>
      {/* AQUI VOCÊ VAI DESENVOLVER: busca, listagem e status dos contatos. */}
    </PageCard>
  );
}
// Formulário visual para convidar um novo contato.
function FriendRequest({ navigate }: { navigate: (s: Screen) => void }) {
  return (
    <PageCard
      title="Solicitação de amizade"
      subtitle="Informe os dados da pessoa para enviar um convite."
      icon="+"
    >
      <button className="back" onClick={() => navigate("contacts")}>
        ← Voltar
      </button>
      <form className="form" onSubmit={(e) => e.preventDefault()}>
        <Field label="E-mail" type="email" placeholder="amigo@exemplo.com" />
        <div className="separator">
          <span>ou</span>
        </div>
        <Field label="Telefone" type="tel" placeholder="(00) 00000-0000" />
        <Field label="Nome" placeholder="Nome do contato" />
        {/* AQUI VOCÊ VAI DESENVOLVER: busca e envio da solicitação. */}
        <button className="primary wide">Enviar solicitação</button>
      </form>
    </PageCard>
  );
}
// Lista ocorrências, alertas e rotas recentes.
function History() {
  return (
    <PageCard
      title="Histórico"
      subtitle="Suas últimas ocorrências e rotas."
      icon="↺"
    >
      <Search />
      <div className="tabs">
        <button className="active">Todos</button>
        <button>Rotas</button>
        <button>Alertas</button>
      </div>
      <div className="timeline">
        <HistoryItem
          icon="⌖"
          title="Rota finalizada"
          meta="Casa → Trabalho"
          time="Hoje, 12:00"
        />
        <HistoryItem
          icon="♢"
          title="Alerta SOS encerrado"
          meta="Contato avisado: Mariana"
          time="Hoje, 09:30"
        />
        <HistoryItem
          icon="⌖"
          title="Rota finalizada"
          meta="Escola → Casa"
          time="Ontem, 18:45"
        />
      </div>
      {/* AQUI VOCÊ VAI DESENVOLVER: filtros, paginação e histórico real. */}
    </PageCard>
  );
}
// Organiza dispositivos monitorados, locais favoritos e círculos.
function Devices() {
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
// -----------------------------------------------------------------------------
// Assinatura e perfil
// -----------------------------------------------------------------------------

// Compara os planos disponíveis para assinatura.
function Plans({ navigate }: { navigate: (s: Screen) => void }) {
  return (
    <PageCard
      title="Planos de assinatura"
      subtitle="Escolha a proteção ideal para sua rotina."
      icon="◇"
      wide
    >
      <button className="back" onClick={() => navigate("profile")}>
        ← Voltar
      </button>
      <div className="plans-grid">
        <Plan
          name="Padrão"
          price="Grátis"
          features={[
            "Alerta SOS",
            "Compartilhamento em tempo real",
            "Até 4 contatos",
          ]}
          current
        />
        <Plan
          name="Premium"
          price="R$ 9,99/mês"
          features={[
            "Todos os recursos do Padrão",
            "Dispositivo embarcado",
            "Notificação de contato",
            "Contatos ilimitados",
          ]}
        />
      </div>
      {/* AQUI VOCÊ VAI DESENVOLVER: contratação, pagamento e troca de plano. */}
    </PageCard>
  );
}
// Reúne dados pessoais, plano atual e preferências do usuário.
function Profile({
  navigate,
  theme,
  toggleTheme,
}: {
  navigate: (s: Screen) => void;
  theme: Theme;
  toggleTheme: () => void;
}) {
  return (
    <PageCard
      title="Meu perfil"
      subtitle="Gerencie seus dados e preferências."
      icon="♙"
      wide
    >
      <div className="profile-grid">
        <div className="profile-photo">
          <span>XA</span>
          <button>Alterar foto</button>
        </div>
        <form className="form compact" onSubmit={(e) => e.preventDefault()}>
          <Field label="Nome" defaultValue="Usuário Aurora" />
          <Field
            label="E-mail"
            type="email"
            defaultValue="usuario@aurora.com"
          />
          <Field label="Telefone" defaultValue="(00) 00000-0000" />
          <button className="primary">Salvar alterações</button>
        </form>
      </div>
      <div className="profile-bottom">
        <section>
          <div className="section-heading">
            <div>
              <h2>Plano atual</h2>
              <p>Plano Padrão</p>
            </div>
            <button className="link" onClick={() => navigate("plans")}>
              Ver planos →
            </button>
          </div>
        </section>
        <section>
          <h2>Configurações</h2>
          <Toggle label="Notificações" checked />
          <Toggle
            label="Modo escuro"
            checked={theme === "dark"}
            onChange={toggleTheme}
          />
          <Toggle label="Acessibilidade" />
        </section>
      </div>
      <div className="danger-zone">
        <button className="secondary">Alterar senha</button>
        <button className="danger">Excluir conta</button>
      </div>
      {/* AQUI VOCÊ VAI DESENVOLVER: perfil, preferências e exclusão da conta. */}
    </PageCard>
  );
}

// -----------------------------------------------------------------------------
// Componentes reutilizáveis
// -----------------------------------------------------------------------------

// Card-base usado nas páginas internas do painel.
function PageCard({
  title,
  subtitle,
  icon,
  children,
  wide = false,
}: {
  title: string;
  subtitle: string;
  icon: string;
  children: ReactNode;
  wide?: boolean;
}) {
  return (
    <section className={`page-card ${wide ? "page-card-wide" : ""}`}>
      <header className="page-heading">
        <span className="page-icon">{icon}</span>
        <div>
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>
      </header>
      {children}
    </section>
  );
}
// Campo de formulário com rótulo e configurações reutilizáveis.
function Field({
  label,
  type = "text",
  placeholder,
  defaultValue,
}: {
  label: string;
  type?: string;
  placeholder?: string;
  defaultValue?: string;
}) {
  return (
    <label className="field">
      <span>{label}</span>
      <input
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
      />
    </label>
  );
}
// Caixa de seleção acompanhada de texto.
function Check({ label }: { label: string }) {
  return (
    <label className="check">
      <input type="checkbox" />
      <span>{label}</span>
    </label>
  );
}
// Campo visual de busca usado nas listagens.
function Search() {
  return (
    <label className="search">
      <span>⌕</span>
      <input type="search" placeholder="Buscar" />
    </label>
  );
}
// Gera as iniciais usadas no avatar de um contato.
function Avatar({ name }: { name: string }) {
  return (
    <span className="avatar">
      {name
        .split(" ")
        .map((p) => p[0])
        .slice(0, 2)
        .join("")}
    </span>
  );
}
// Interruptor visual para ativar ou desativar uma preferência.
function Toggle({
  label,
  checked = false,
  onChange,
}: {
  label: string;
  checked?: boolean;
  onChange?: () => void;
}) {
  return (
    <label className="toggle-row">
      <span>{label}</span>
      <input
        type="checkbox"
        {...(onChange ? { checked, onChange } : { defaultChecked: checked })}
      />
      <i />
    </label>
  );
}
// Linha reutilizável que representa um dispositivo monitorado.
function Device({ name, status }: { name: string; status: string }) {
  return (
    <div className="device-row">
      <span className="device-icon">▯</span>
      <div>
        <strong>{name}</strong>
        <small>{status}</small>
      </div>
      <button className="more">•••</button>
    </div>
  );
}
// Linha reutilizável para uma ocorrência do histórico.
function HistoryItem({
  icon,
  title,
  meta,
  time,
}: {
  icon: string;
  title: string;
  meta: string;
  time: string;
}) {
  return (
    <div className="history-row">
      <span className="history-icon">{icon}</span>
      <div>
        <strong>{title}</strong>
        <small>{meta}</small>
      </div>
      <time>{time}</time>
    </div>
  );
}
// Card que apresenta preço e benefícios de um plano.
function Plan({
  name,
  price,
  features,
  current = false,
}: {
  name: string;
  price: string;
  features: string[];
  current?: boolean;
}) {
  return (
    <article className={`plan ${current ? "current" : "premium"}`}>
      {current && <span className="plan-badge">Plano atual</span>}
      <h2>Plano {name}</h2>
      <strong className="price">{price}</strong>
      <ul>
        {features.map((f) => (
          <li key={f}>✓ {f}</li>
        ))}
      </ul>
      <button className={current ? "secondary wide" : "primary wide"}>
        {current ? "Plano selecionado" : "Assinar Premium"}
      </button>
    </article>
  );
}

export default App;
