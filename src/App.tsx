import { useEffect, useState } from "react";
import { Footer } from "./components/layout/Footer";
import { Header } from "./components/layout/Header";
import { SeletorTelas } from "./components/layout/SeletorTelas";
import { nomesTelas } from "./config/screens";
import { CirclesPage } from "./pages/CirclesPage";
import { ContactsPage } from "./pages/ContactsPage";
import { DevicesPage } from "./pages/DevicesPage";
import { ForgotPasswordPage } from "./pages/ForgotPasswordPage";
import { FriendRequestPage } from "./pages/FriendRequestPage";
import { HistoryPage } from "./pages/HistoryPage";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { OtpPage } from "./pages/OtpPage";
import { PlansPage } from "./pages/PlansPage";
import { ProfilePage } from "./pages/ProfilePage";
import { SignupPage } from "./pages/SignupPage";
import type { Screen, Theme } from "./types/app";
import "./App.css";

// Componente principal: controla apenas navegação, tema e estrutura global.
function App() {
  const [screen, setScreen] = useState<Screen>(() => {
    //  substituir esta navegação por React Router.
    const telaSelecionada = window.location.hash.replace("#/", "") as Screen;
    return telaSelecionada in nomesTelas ? telaSelecionada : "home";
  });

  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem("aurora-theme") as Theme | null;

    if (savedTheme === "light" || savedTheme === "dark") {
      return savedTheme;
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  // Sincroniza o tema com o HTML e a preferência salva no navegador.
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("aurora-theme", theme);
  }, [theme]);

  function navigate(nextScreen: Screen) {
    setScreen(nextScreen);
    window.location.hash = `/${nextScreen}`;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function toggleTheme() {
    setTheme((currentTheme) => (currentTheme === "light" ? "dark" : "light"));
  }

  return (
    <div className="app">
      <Header navigate={navigate} theme={theme} toggleTheme={toggleTheme} />

      <main className="main-content">
        <PaginaAtual
          screen={screen}
          theme={theme}
          navigate={navigate}
          toggleTheme={toggleTheme}
        />
      </main>

      <Footer />
      <SeletorTelas telaAtual={screen} navegar={navigate} />
    </div>
  );
}

type PropriedadesPaginaAtual = {
  screen: Screen;
  theme: Theme;
  navigate: (screen: Screen) => void;
  toggleTheme: () => void;
};

// Renderiza a página selecionada pelo protótipo.
function PaginaAtual({
  screen,
  theme,
  navigate,
  toggleTheme,
}: PropriedadesPaginaAtual) {
  switch (screen) {
    case "login":
      return <LoginPage navigate={navigate} />;
    case "signup":
      return <SignupPage navigate={navigate} />;
    case "forgot":
      return <ForgotPasswordPage navigate={navigate} />;
    case "otp":
      return <OtpPage />;
    case "contacts":
      return <ContactsPage navigate={navigate} />;
    case "friend-request":
      return <FriendRequestPage navigate={navigate} />;
    case "history":
      return <HistoryPage />;
    case "devices":
      return <DevicesPage />;
    case "circles":
      return <CirclesPage navigate={navigate} />;
    case "plans":
      return <PlansPage navigate={navigate} />;
    case "profile":
      return (
        <ProfilePage
          navigate={navigate}
          theme={theme}
          toggleTheme={toggleTheme}
        />
      );
    default:
      return <HomePage navigate={navigate} />;
  }
}

export default App;
