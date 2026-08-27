import type { Screen } from "../types/app";

// Rótulos exibidos no seletor temporário de telas.
export const screenNames: Record<Screen, string> = {
  home: "Início",
  login: "Login",
  signup: "Criar conta",
  forgot: "Esqueci a senha",
  otp: "Código OTP",
  contacts: "Contatos",
  "friend-request": "Solicitação de amizade",
  history: "Histórico",
  devices: "Dispositivos",
  circles: "Meus círculos",
  plans: "Planos",
  profile: "Meu perfil",
};
