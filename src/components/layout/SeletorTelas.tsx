import { nomesTelas } from "../../config/screens";
import type { Navigate, Screen } from "../../types/app";

type PropriedadesSeletorTelas = {
  telaAtual: Screen;
  navegar: Navigate;
};

// Seletor temporário usado para visualizar as telas antes do React Router.
export function SeletorTelas({ telaAtual, navegar }: PropriedadesSeletorTelas) {
  return (
    <label className="screen-picker">
      <span>Visualizar tela</span>
      <select
        value={telaAtual}
        onChange={(evento) => navegar(evento.target.value as Screen)}
      >
        {Object.entries(nomesTelas).map(([valor, nome]) => (
          <option value={valor} key={valor}>
            {nome}
          </option>
        ))}
      </select>
    </label>
  );
}
