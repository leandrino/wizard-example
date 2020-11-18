import React from "react";

export function Review({ users, products }) {
  return (
    <center>
      <h2>Usuários</h2>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Meta</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user, index) => {
            return (
              <tr key={index}>
                <td>{user.nome}</td>
                <td>{`R$ ${user.meta.toFixed(2)}`}</td>
              </tr>
            );
          })}
          {users?.length < 1 && (
            <tr>
              <td colspan="2">Nenhum usuário selecionado.</td>
            </tr>
          )}
        </tbody>
      </table>
      <h2>Produtos</h2>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Ativo</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((product, index) => {
            return (
              <tr key={index}>
                <td>{product.nome}</td>
                <td>{product?.ativo ? "Sim" : "Não"}</td>
              </tr>
            );
          })}
          {products?.length < 1 && (
            <tr>
              <td colspan="2">Nenhum produto selecionado.</td>
            </tr>
          )}
        </tbody>
      </table>
    </center>
  );
}
