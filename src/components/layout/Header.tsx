import type { Navigate, Theme } from "../../types/app";
import { LogoAurora } from "../ui/LogoAurora";

type HeaderProps = {
  navigate: Navigate;
  theme: Theme;
  toggleTheme: () => void;
};

// Cabeçalho global com atalhos de autenticação, perfil e tema.
export function Header({ navigate, theme, toggleTheme }: HeaderProps) {
  return (
    <header className="site-header">
      <button className="logo" onClick={() => navigate("home")}>
        <LogoAurora />
        <span>Aurora</span>
      </button>

      <nav className="header-actions" aria-label="Navegação principal">
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
