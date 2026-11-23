type ImagemAvaliacao = {
  id: string;
  imagem?: { src: string; alt: string };
};

// Adicione imagem: { src: imagemImportada, alt: "Texto da avaliação" }.
// Para avaliações em imagem, inclua o depoimento no alt para torná-lo acessível.
export const imagensAvaliacoes: ImagemAvaliacao[] = [
  { id: "avaliacao-1" },
  { id: "avaliacao-2" },
  { id: "avaliacao-3" },
  { id: "avaliacao-4" },
];
