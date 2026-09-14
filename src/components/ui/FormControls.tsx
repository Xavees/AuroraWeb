import type { ChangeEventHandler } from "react";

type FieldProps = {
  label: string;
  type?: string;
  placeholder?: string;
  defaultValue?: string;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  required?: boolean;
};

// Campo de formulário reutilizável.
export function Field({
  label,
  type = "text",
  placeholder,
  defaultValue,
  value,
  onChange,
  required,
}: FieldProps) {
  return (
    <label className="field">
      <span>{label}</span>
      <input
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
        required={required}
      />
    </label>
  );
}

type CheckProps = {
  label: string;
  checked?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
};

// Caixa de seleção textual, controlada quando recebe estado e evento.
export function Check({ label, checked, onChange }: CheckProps) {
  return (
    <label className="check">
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span>{label}</span>
    </label>
  );
}

// Campo visual de busca.
export function Search() {
  return (
    <label className="search">
      <span>⌕</span>
      <input type="search" placeholder="Buscar" />
    </label>
  );
}

type ToggleProps = { label: string; checked?: boolean; onChange?: () => void };

// Interruptor para preferências e configurações.
export function Toggle({ label, checked = false, onChange }: ToggleProps) {
  return (
    <label className="toggle-row">
      <span>{label}</span>
      <input
        type="checkbox"
        {...(onChange ? { checked, onChange } : { defaultChecked: checked })}
      />
      <i />
    </label>
  );
}
