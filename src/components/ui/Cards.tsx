import type { ReactNode } from "react";

type CardProps = { title: string; subtitle: string; children: ReactNode };

// Estrutura visual das telas de autenticação.
export function AuthCard({ title, subtitle, children }: CardProps) {
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

type PageCardProps = CardProps & { icon: string; wide?: boolean };

// Estrutura visual das páginas internas.
export function PageCard({
  title,
  subtitle,
  icon,
  children,
  wide = false,
}: PageCardProps) {
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
