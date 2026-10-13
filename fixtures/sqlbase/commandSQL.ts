import { gerarDados } from "../../support/main"
const dados = gerarDados();

export const criarUser = 
`INSERT INTO cliente (NOME, EMAIL, TELEFONE, CIDADE, UF)
 VALUES('${dados.nome}', '${dados.email}', '${dados.celular}', '${dados.estado}', 'SP')`

 export const searchUser = 
 `SELECT * FROM (
    SELECT *
    FROM cliente
    ORDER BY id_cliente DESC) WHERE ROWNUM = 1;`

export const updateUser = (id: number) =>
  `UPDATE CLIENTE SET NOME = 'USUARIO ATUALIZADO' WHERE ID_CLIENTE = ${id}`;


export const deleteUser = (id: number)=>
    `DELETE FROM CLIENTE WHERE ID_CLIENTE = ${id} `
