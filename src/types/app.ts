// Telas disponíveis no protótipo.
export type Screen =
  | "home"
  | "login"
  | "signup"
  | "forgot"
  | "otp"
  | "contacts"
  | "friend-request"
  | "history"
  | "devices"
  | "circles"
  | "plans"
  | "profile";

// Temas visuais disponíveis.
export type Theme = "light" | "dark";

// Função compartilhada pelas telas que precisam navegar.
export type Navigate = (screen: Screen) => void;
