export const productsService = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([
        { nome: "Gardenal", ativo: false },
        { nome: "Aspirina", ativo: false },
        { nome: "Nitroglicerina", ativo: false },
        { nome: "Jurupinga", ativo: false }
      ]);
    }, 3000);
  });
};
