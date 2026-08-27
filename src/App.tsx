import { useEffect, useState } from "react";
import { Footer } from "./components/layout/Footer";
import { Header } from "./components/layout/Header";
import { ScreenPicker } from "./components/layout/ScreenPicker";
import { screenNames } from "./config/screens";
import {
  FriendRequestPage,
  PlansPage,
  ProfilePage,
} from "./pages/AccountPages";
import {
  ForgotPasswordPage,
  LoginPage,
  OtpPage,
  SignupPage,
} from "./pages/AuthPages";
import { HomePage } from "./pages/HomePage";
import { CirclesPage } from "./pages/CirclesPage";
import {
  ContactsPage,
  DevicesPage,
  HistoryPage,
} from "./pages/MonitoringPages";
import type { Screen, Theme } from "./types/app";
import "./App.css";

// Componente principal: controla apenas navegação, tema e estrutura global.
function App() {
  const [screen, setScreen] = useState<Screen>(() => {
    // AQUI VOCÊ VAI DESENVOLVER: substitua esta navegação por React Router.
    const selectedScreen = window.location.hash.replace("#/", "") as Screen;
    return selectedScreen in screenNames ? selectedScreen : "home";
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
        <CurrentPage
          screen={screen}
          theme={theme}
          navigate={navigate}
          toggleTheme={toggleTheme}
        />
      </main>

      <Footer />
      <ScreenPicker screen={screen} navigate={navigate} />
    </div>
  );
}

type CurrentPageProps = {
  screen: Screen;
  theme: Theme;
  navigate: (screen: Screen) => void;
  toggleTheme: () => void;
};

// Renderiza a página selecionada pelo protótipo.
function CurrentPage({
  screen,
  theme,
  navigate,
  toggleTheme,
}: CurrentPageProps) {
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
