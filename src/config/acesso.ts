import type { Screen } from "../types/aplicacao";

export function telaPermitida(tela: Screen, estaLogado: boolean): Screen {
  const publica = ["home", "login", "signup", "forgot"].includes(tela);
  return publica || estaLogado ? tela : "login";
}
