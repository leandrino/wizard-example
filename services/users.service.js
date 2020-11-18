export const usersService = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([
        { nome: "Mary Doe", meta: 10900.54, ativo: false },
        { nome: "Jhon Doe", meta: 10800.73, ativo: false },
        { nome: "Larry Doe", meta: 10700.82, ativo: false },
        { nome: "Paty Doe", meta: 10600.91, ativo: false }
      ]);
    }, 3000);
  });
};
