import { AuthCard } from "../components/ui/Cards";

// Recebe o código de quatro dígitos enviado ao usuário.
export function OtpPage() {
  return (
    <AuthCard
      title="Código de verificação"
      subtitle="Digite o código de 4 dígitos enviado para seu e-mail."
    >
      <form className="form" onSubmit={(event) => event.preventDefault()}>
        <div className="otp-row">
          {[1, 2, 3, 4].map((number) => (
            <input
              key={number}
              inputMode="numeric"
              maxLength={1}
              aria-label={`Dígito ${number}`}
            />
          ))}
        </div>
        {/* AQUI VOCÊ VAI DESENVOLVER: validação, expiração e reenvio do OTP. */}
        <button className="primary wide">Confirmar código</button>
        <button className="link centered" type="button">
          Reenviar código
        </button>
      </form>
    </AuthCard>
  );
}
