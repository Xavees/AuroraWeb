type FieldProps = {
  label: string;
  type?: string;
  placeholder?: string;
  defaultValue?: string;
};

// Campo de formulário reutilizável.
export function Field({
  label,
  type = "text",
  placeholder,
  defaultValue,
}: FieldProps) {
  return (
    <label className="field">
      <span>{label}</span>
      <input
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
      />
    </label>
  );
}

// Caixa de seleção textual.
export function Check({ label }: { label: string }) {
  return (
    <label className="check">
      <input type="checkbox" />
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
