import { LogoAurora } from "../ui/LogoAurora";

// Rodapé institucional compartilhado por todas as telas.
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="logo footer-logo">
        <LogoAurora />
        <span>Aurora</span>
      </div>
      <p>© 2026 Aurora. Todos os direitos reservados.</p>
    </footer>
  );
}
