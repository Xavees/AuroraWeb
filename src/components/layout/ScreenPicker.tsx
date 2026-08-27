import { screenNames } from "../../config/screens";
import type { Navigate, Screen } from "../../types/app";

type ScreenPickerProps = { screen: Screen; navigate: Navigate };

// Seletor temporário usado para visualizar as telas antes do React Router.
export function ScreenPicker({ screen, navigate }: ScreenPickerProps) {
  return (
    <label className="screen-picker">
      <span>Visualizar tela</span>
      <select
        value={screen}
        onChange={(event) => navigate(event.target.value as Screen)}
      >
        {Object.entries(screenNames).map(([value, label]) => (
          <option value={value} key={value}>
            {label}
          </option>
        ))}
      </select>
    </label>
  );
}
