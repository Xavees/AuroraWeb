import { useAutenticacao } from "./hooks/useAutenticacao";
import { useEffect, useState } from "react";
import { Rodape } from "./components/layout/Rodape";
import { Cabecalho } from "./components/layout/Cabecalho";
import { SeletorTelas } from "./components/layout/SeletorTelas";
import { nomesTelas } from "./config/telas";
import { PaginaEntrarCirculo } from "./pages/PaginaEntrarCirculo";
import { PaginaCriarCirculo } from "./pages/PaginaCriarCirculo";
import { PaginaCirculos } from "./pages/PaginaCirculos";
import { PaginaContatos } from "./pages/PaginaContatos";

import { PaginaRecuperarSenha } from "./pages/PaginaRecuperarSenha";
import { PaginaConviteContatoConfianca } from "./pages/PaginaConviteContatoConfianca";
import { PaginaHistoricoLocalizacao } from "./pages/PaginaHistoricoLocalizacao";
import { PaginaInicio } from "./pages/PaginaInicio";
import { PaginaMapaRisco } from "./pages/PaginaMapaRisco";
import { PaginaLogin } from "./pages/PaginaLogin";

import { PaginaPlanos } from "./pages/PaginaPlanos";
import { PaginaPerfil } from "./pages/PaginaPerfil";
import { PaginaCadastro } from "./pages/PaginaCadastro";
import type { Screen, Theme } from "./types/aplicacao";
import "./Aplicacao.css";

// Componente principal: controla apenas navegação, tema e estrutura global.
function Aplicacao() {
  const { usuario } = useAutenticacao();
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

  useEffect(() => {
    function syncScreen() {
      const nextScreen = window.location.hash.replace("#/", "") as Screen;
      setScreen(Object.hasOwn(nomesTelas, nextScreen) ? nextScreen : "home");
      window.scrollTo({ top: 0 });
    }
    window.addEventListener("hashchange", syncScreen);
    return () => window.removeEventListener("hashchange", syncScreen);
  }, []);

  function toggleTheme() {
    setTheme((currentTheme) => (currentTheme === "light" ? "dark" : "light"));
  }

  return (
    <div className="app">
      <Cabecalho
        screen={screen}
        navigate={navigate}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      <main className="main-content">
        <PaginaAtual
          key={usuario?.id ?? "visitante"}
          screen={screen}
          theme={theme}
          navigate={navigate}
          toggleTheme={toggleTheme}
        />
      </main>

      <Rodape />
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
    case "risk-map":
      return <PaginaMapaRisco navigate={navigate} />;
    case "login":
      return <PaginaLogin navigate={navigate} />;
    case "signup":
      return <PaginaCadastro navigate={navigate} />;
    case "forgot":
      return <PaginaRecuperarSenha navigate={navigate} />;

    case "contacts":
      return <PaginaContatos navigate={navigate} />;
    case "trusted-contact-invite":
      return <PaginaConviteContatoConfianca navigate={navigate} />;
    case "history":
      return <PaginaHistoricoLocalizacao />;

    case "join-circle":
      return <PaginaEntrarCirculo navigate={navigate} />;
    case "create-circle":
      return <PaginaCriarCirculo navigate={navigate} />;
    case "circles":
      return <PaginaCirculos navigate={navigate} />;
    case "plans":
      return <PaginaPlanos navigate={navigate} />;
    case "profile":
      return (
        <PaginaPerfil
          navigate={navigate}
          theme={theme}
          toggleTheme={toggleTheme}
        />
      );
    default:
      return <PaginaInicio navigate={navigate} theme={theme} />;
  }
}

export default Aplicacao;
