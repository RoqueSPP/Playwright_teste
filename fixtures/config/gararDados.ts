import { fakerPT_BR as faker } from '@faker-js/faker';

function digitos(qtd: number): string {
  return Array.from({ length: qtd }, () =>
    faker.number.int({ min: 0, max: 9 }),
  ).join('');
}

function gerarCpf(): string {
  let cpf = digitos(9);

  // Evita sequências como 111.111.111-11
  while (/^(\d)\1+$/.test(cpf)) {
    cpf = digitos(9);
  }

  const calcularDigito = (base: string, pesoInicial: number) => {
    const soma = [...base].reduce(
      (total, digito, indice) =>
        total + Number(digito) * (pesoInicial - indice),
      0,
    );

    const resto = soma % 11;
    return resto < 2 ? 0 : 11 - resto;
  };

  const primeiroDigito = calcularDigito(cpf, 10);
  cpf += primeiroDigito;

  const segundoDigito = calcularDigito(cpf, 11);
  cpf += segundoDigito;

  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

function calcularIdade(nascimento: Date): number {
  const hoje = new Date();
  let idade = hoje.getFullYear() - nascimento.getFullYear();

  const aindaNaoFezAniversario =
    hoje.getMonth() < nascimento.getMonth() ||
    (hoje.getMonth() === nascimento.getMonth() &&
      hoje.getDate() < nascimento.getDate());

  if (aindaNaoFezAniversario) idade--;

  return idade;
}

function calcularSigno(data: Date): string {
  const mes = data.getMonth() + 1;
  const dia = data.getDate();

  if ((mes === 1 && dia >= 20) || (mes === 2 && dia <= 18)) return 'Aquário';
  if ((mes === 2 && dia >= 19) || (mes === 3 && dia <= 20)) return 'Peixes';
  if ((mes === 3 && dia >= 21) || (mes === 4 && dia <= 19)) return 'Áries';
  if ((mes === 4 && dia >= 20) || (mes === 5 && dia <= 20)) return 'Touro';
  if ((mes === 5 && dia >= 21) || (mes === 6 && dia <= 20)) return 'Gêmeos';
  if ((mes === 6 && dia >= 21) || (mes === 7 && dia <= 22)) return 'Câncer';
  if ((mes === 7 && dia >= 23) || (mes === 8 && dia <= 22)) return 'Leão';
  if ((mes === 8 && dia >= 23) || (mes === 9 && dia <= 22)) return 'Virgem';
  if ((mes === 9 && dia >= 23) || (mes === 10 && dia <= 22)) return 'Libra';
  if ((mes === 10 && dia >= 23) || (mes === 11 && dia <= 21)) return 'Escorpião';
  if ((mes === 11 && dia >= 22) || (mes === 12 && dia <= 21)) {
    return 'Sagitário';
  }

  return 'Capricórnio';
}

function gerarTelefone(celular: boolean): string {
  const ddd = faker.helpers.arrayElement([
    '11', '21', '31', '41', '51', '61', '71', '81',
  ]);

  const prefixo = celular ? '9' : faker.helpers.arrayElement(['2', '3', '4', '5']);
  const primeiroBloco = `${prefixo}${digitos(celular ? 4 : 3)}`;
  const segundoBloco = digitos(4);

  return `(${ddd}) ${primeiroBloco}-${segundoBloco}`;
}

export function gerarDados() {
  const sexo = faker.helpers.arrayElement(['Feminino', 'Masculino']);
  const generoFaker = sexo === 'Feminino' ? 'female' : 'male';

  const nome = `${faker.person.firstName(generoFaker)} ${faker.person.lastName()}`;
  const nascimento = faker.date.birthdate({
    min: 18,
    max: 80,
    mode: 'age',
  });

  const dataFormatada = [
    String(nascimento.getDate()).padStart(2, '0'),
    String(nascimento.getMonth() + 1).padStart(2, '0'),
    nascimento.getFullYear(),
  ].join('/');

  return {
    Nome_Generico: nome,
    Idade_Generico: calcularIdade(nascimento),
    CPF_Generico: gerarCpf(),
    RG_Generico: `${digitos(2)}.${digitos(3)}.${digitos(3)}-${digitos(1)}`,
    'data[0]_nasc_Generico': dataFormatada,
    sexoGenerico: sexo,
    signo_Generico: calcularSigno(nascimento),
    mae_Generico: `${faker.person.firstName('female')} ${faker.person.lastName()}`,
    pai_Generico: `${faker.person.firstName('male')} ${faker.person.lastName()}`,
    email_Generico: faker.internet.email(),
    senha_Generico: faker.internet.password({ length: 14 }),
    cep_Generico: faker.location.zipCode('#####-###'),
    endereco_Generico: faker.location.streetAddress(),
    numero_Generico: String(faker.number.int({ min: 1, max: 9999 })),
    bairro_Generico: faker.location.secondaryAddress(),
    cidade_Generico: faker.location.city(),
    estado_Generico: faker.location.state(),
    telefone_fixo_Generico: gerarTelefone(false),
    celular_Generico: gerarTelefone(true),
    altura_Generico: `${(faker.number.int({ min: 145, max: 200 }) / 100)
      .toFixed(2)
      .replace('.', ',')} m`,
    peso_Generico: `${faker.number.int({ min: 45, max: 130 })} kg`,
    tipo_sanguineo_Generico: faker.helpers.arrayElement([
      'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-',
    ]),
    cor_Generico: faker.helpers.arrayElement([
      'Azul', 'Verde', 'Castanho', 'Preto', 'Cinza',
    ]),
  };
}
