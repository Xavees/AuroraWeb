import type { Navigate, Screen, Theme } from "../../types/aplicacao";
import { useAutenticacao } from "../../hooks/useAutenticacao";
import { LogoAurora } from "../ui/LogoAurora";

type HeaderProps = {
  navigate: Navigate;
  screen: Screen;
  theme: Theme;
  toggleTheme: () => void;
};

// Cabeçalho global com atalhos de autenticação, perfil e tema.
export function Cabecalho({ navigate, screen, theme, toggleTheme }: HeaderProps) {
  const { usuario, estaLogado, sair } = useAutenticacao();
  const foto = enderecoFoto(usuario?.fotoUrl ?? null);
  const [fotoComErro, setFotoComErro] = useState<string | null>(null);

  function encerrarSessao() {
    sair();
    navigate("home");
  }

  return (
    <header className="site-header">
      <button className="logo" onClick={() => navigate("home")}>
        <LogoAurora />
        <span>Aurora</span>
      </button>

      <nav className="feature-nav" aria-label="Navegação principal">
        {([
          ["home", "Início"],
          ["risk-map", "Mapa"],
          ["circles", "Círculos"],
          ["history", "Histórico"],
        ] as const).map(([destination, label]) => (
          <a
            key={destination}
            href={`#/${destination}`}
            aria-current={screen === destination ? "page" : undefined}
            onClick={(event) => {
              if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
              event.preventDefault();
              navigate(destination);
            }}
          >
            {label}
          </a>
        ))}
      </nav>

      <nav className="header-actions" aria-label="Conta e aparência">
        {estaLogado && usuario ? (
          <>
            <button className="header-user" onClick={() => navigate("profile")}>
              <span className="header-avatar">
                {foto && foto !== fotoComErro ? (
                  <img src={foto} alt="" referrerPolicy="no-referrer" onError={() => setFotoComErro(foto)} />
                ) : usuario.nome.charAt(0).toUpperCase()}
              </span>
              <span>{usuario.nome}</span>
            </button>
            <button className="text-button" onClick={encerrarSessao}>
              Sair
            </button>
          </>
        ) : (
          <>
            <button className="text-button" onClick={() => navigate("login")}>
              Entrar
            </button>
            <button
              className="primary small"
              onClick={() => navigate("signup")}
            >
              Criar conta
            </button>
          </>
        )}
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
import { useState } from "react";
import { enderecoFoto } from "../../services/api/usuariosApi";
