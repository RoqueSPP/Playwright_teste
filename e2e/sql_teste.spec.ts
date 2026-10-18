import { test, conectar, criarUser, deleteUser, searchUser, updateUser } from '../support/main'

test.describe('Teste de Banco de Dados Oracle', () => {
  let user: number
  test('Database inserir registro', async () => {
    const query = criarUser;
    const result = await conectar(query);
    console.log(result);
  })
  test('DataBase Buscar Registro', async () => {
    const query = searchUser;
    const result = await conectar(query)
    user = result[0]?.ID_CLIENTE
    console.log(user)
  })
  test('DataBase Atualizar Registro', async () => {
    const query = searchUser;
    const result = await conectar(updateUser(user));
    console.log('Resultado do UPDATE:', result);
    const result2 = await conectar(query)
    console.log('Resultado do UPDATE:', result2);
  });
    test('DataBase Buscar Registro Atualizar', async () => {
    const query = searchUser;
    const result = await conectar(query)
    console.log(result)
  })
  test('DataBase Deletar Registro', async () => {
    const result = await conectar(deleteUser(user));
    console.log('Resultado do DELETE:', result);
  });
});