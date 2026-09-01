import iconeAurora from "../../assets/iconColorido.png";

type PropriedadesLogoAurora = {
  tamanho?: "pequena" | "grande";
};

// Exibe o símbolo oficial sem distorcer sua proporção original.
export function LogoAurora({ tamanho = "pequena" }: PropriedadesLogoAurora) {
  return (
    <img
      className={`logo-aurora logo-aurora-${tamanho}`}
      src={iconeAurora}
      alt=""
      aria-hidden="true"
    />
  );
}
