import { config, test, expect,bodyUser } from '../support/main'

test.describe('Example Test Suite', () => {
  let idUser: number |string;

  test('API Test post', async ({ api }) => {
    const response = await api.post('https://gorest.co.in/public/v2/users', {
      headers: {
        Authorization: `Bearer ${config.auth.token}`
      },
      data: bodyUser
    });
    expect(response.status()).toBe(201);
    const data = await response.json();
    idUser = data.id;
    console.log(idUser);
    console.log(data.name);
  })
  test('API Test put', async ({ api }) => {
    bodyUser.name = "Updated Name"
    const response = await api.put(`https://gorest.co.in/public/v2/users/${idUser}`, {
      headers: {
        Authorization: `Bearer ${config.auth.token}`
      },
      data: bodyUser
    });
    expect(response.status()).toBe(200);
    const data = await response.json();
    idUser = data.id;
    console.log(idUser);
    console.log(data.name);
  })

  test('API Test get', async ({ api }) => {
    const response = await api.get(`https://gorest.co.in/public/v2/users/${idUser}`, {
      headers: {
        Authorization: `Bearer ${config.auth.token}`
      }
    });
    expect(response.status()).toBe(200);
    const data = await response.json();
    console.log(data.name);
    console.log(data.email);
  })

  test('API Test delete', async ({ api }) => {
    const response = await api.delete(`https://gorest.co.in/public/v2/users/${idUser}`, {
      headers: {
        Authorization: `Bearer ${config.auth.token}`
      }
    });
    expect(response.status()).toBe(204);
  })
})

