import { gerarDados } from "../config/gararDados";
const data = gerarDados();

export const bodyUser = {
  name: data.nome,
  email: data.email,
  gender: "male",
  status: "active"
};