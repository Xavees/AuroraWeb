// Telas disponíveis no protótipo.
export type Screen =
  | "home"
  | "risk-map"
  | "login"
  | "signup"
  | "forgot"
  | "contacts"
  | "trusted-contact-invite"
  | "history"
  | "circles"
  | "join-circle"
  | "create-circle"
  | "plans"
  | "profile";

// Temas visuais disponíveis.
export type Theme = "light" | "dark";

// Função compartilhada pelas telas que precisam navegar.
export type Navigate = (screen: Screen) => void;
