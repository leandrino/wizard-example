import React from "react";

export function UsersList({ users, onSetUserEnabled }) {
  return (
    <center>
      <h2>Usuários</h2>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Meta</th>
            <th>Ativo</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user, index) => {
            return (
              <tr key={index}>
                <td>{user.nome}</td>
                <td>{`R$ ${user.meta.toFixed(2)}`}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={user.ativo}
                    onChange={() => onSetUserEnabled(index, !user.ativo)}
                  />
                  {users.ativo ? "Sim" : "Não"}
                </td>
              </tr>
            );
          })}
          {users?.length < 1 && (
            <tr>
              <td colspan="2">Nenhum usuário cadastrado.</td>
            </tr>
          )}
        </tbody>
      </table>
    </center>
  );
}
