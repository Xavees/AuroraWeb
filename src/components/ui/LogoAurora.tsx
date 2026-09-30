import iconeAurora from "../../assets/v3 - Atual/separado/LogoTipoAurora.png";
import logoClara from "../../assets/v3 - Atual/vertical/AuroraPreto.png";
import logoEscura from "../../assets/v3 - Atual/vertical/AuroraBranco.png";

type PropriedadesLogoAurora = {
  tamanho?: "pequena" | "grande";
};

// Exibe o símbolo oficial sem distorcer sua proporção original.
export function LogoAurora({ tamanho = "pequena" }: PropriedadesLogoAurora) {
  if (tamanho === "grande") {
    return (
      <div className="logo-aurora-completa">
        <img
          className="logo-aurora logo-aurora-grande logo-aurora-clara"
          src={logoClara}
          alt="Aurora"
        />
        <img
          className="logo-aurora logo-aurora-grande logo-aurora-escura"
          src={logoEscura}
          alt="Aurora"
        />
      </div>
    );
  }
  return (
    <img
      className={`logo-aurora logo-aurora-${tamanho}`}
      src={iconeAurora}
      alt=""
      aria-hidden="true"
    />
  );
}
