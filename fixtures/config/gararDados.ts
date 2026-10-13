/**
 * Gerador de dados fake (pt-BR) para testes com Playwright.
 * Sem dependências externas.
 *
 * Uso:
 *   import { gerarDadosFake } from './gerarDadosFake';
 *   const dados = gerarDados();
 *   await page.fill('#nome', dados.nome);
 */

export interface DadosFake {
  nome: string;
  cpf: string;
  rg: string;
  dataNascimento: string; // DD/MM/AAAA
  sexo: 'Masculino' | 'Feminino';
  signo: string;
  filiacao: string; // nome da mãe
  pai: string;
  email: string;
  senha: string;
  cep: string;
  endereco: string;
  bairro: string;
  cidade: string;
  estado: string; // UF
  celular: string;
  altura: string; // ex.: "1,75"
  peso: string; // ex.: "72"
  tipoSanguineo: string;
  cor: string;
}

interface Local {
  cep: string;
  endereco: string;
  bairro: string;
  cidade: string;
  estado: string;
  ddd: string;
}

const NOMES_M = ['João', 'Pedro', 'Lucas', 'Gabriel', 'Rafael', 'Carlos', 'Marcos', 'Bruno', 'Felipe', 'André', 'Thiago', 'Rodrigo', 'Eduardo', 'Gustavo', 'Leonardo'];
const NOMES_F = ['Maria', 'Ana', 'Juliana', 'Fernanda', 'Camila', 'Patrícia', 'Aline', 'Beatriz', 'Larissa', 'Mariana', 'Carolina', 'Renata', 'Letícia', 'Amanda', 'Bruna'];
const SOBRENOMES = ['Silva', 'Santos', 'Oliveira', 'Souza', 'Rodrigues', 'Ferreira', 'Alves', 'Pereira', 'Lima', 'Gomes', 'Costa', 'Ribeiro', 'Martins', 'Carvalho', 'Almeida', 'Lopes', 'Barbosa', 'Araújo', 'Melo', 'Cardoso'];

const LOCAIS: Local[] = [
  { cep: '01310-100', endereco: 'Avenida Paulista', bairro: 'Bela Vista', cidade: 'São Paulo', estado: 'SP', ddd: '11' },
  { cep: '22010-000', endereco: 'Avenida Atlântica', bairro: 'Copacabana', cidade: 'Rio de Janeiro', estado: 'RJ', ddd: '21' },
  { cep: '30130-003', endereco: 'Avenida Afonso Pena', bairro: 'Centro', cidade: 'Belo Horizonte', estado: 'MG', ddd: '31' },
  { cep: '80020-310', endereco: 'Rua XV de Novembro', bairro: 'Centro', cidade: 'Curitiba', estado: 'PR', ddd: '41' },
  { cep: '90020-021', endereco: 'Avenida Borges de Medeiros', bairro: 'Centro Histórico', cidade: 'Porto Alegre', estado: 'RS', ddd: '51' },
  { cep: '40060-001', endereco: 'Avenida Sete de Setembro', bairro: 'Centro', cidade: 'Salvador', estado: 'BA', ddd: '71' },
  { cep: '51111-000', endereco: 'Avenida Boa Viagem', bairro: 'Boa Viagem', cidade: 'Recife', estado: 'PE', ddd: '81' },
  { cep: '60165-121', endereco: 'Avenida Beira Mar', bairro: 'Meireles', cidade: 'Fortaleza', estado: 'CE', ddd: '85' },
];

const TIPOS_SANGUINEOS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
const CORES = ['Branca', 'Preta', 'Parda', 'Amarela', 'Indígena'];

// ---------- helpers ----------

const rand = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const pick = <T>(lista: T[]): T => lista[rand(0, lista.length - 1)];

const pad = (n: number, tam = 2): string => String(n).padStart(tam, '0');

const semAcento = (txt: string): string =>
  txt.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

function gerarCPF(): string {
  let digitos: number[];
  do {
    digitos = Array.from({ length: 9 }, () => rand(0, 9));
  } while (digitos.every((d) => d === digitos[0])); // evita 111.111.111-11 etc.

  const calcularDV = (base: number[]): number => {
    const peso = base.length + 1;
    const soma = base.reduce((acc, d, i) => acc + d * (peso - i), 0);
    const resto = (soma * 10) % 11;
    return resto === 10 ? 0 : resto;
  };

  digitos.push(calcularDV(digitos));
  digitos.push(calcularDV(digitos));

  const s = digitos.join('');
  return `${s.slice(0, 3)}.${s.slice(3, 6)}.${s.slice(6, 9)}-${s.slice(9)}`;
}

function gerarRG(): string {
  // O RG não tem um algoritmo único nacional; aqui segue o formato comum de SP.
  const base = Array.from({ length: 8 }, () => rand(0, 9));
  const soma = base.reduce((acc, d, i) => acc + d * (i + 2), 0);
  const resto = soma % 11;
  const dv = resto === 10 ? 'X' : String(resto);
  const s = base.join('');
  return `${s.slice(0, 2)}.${s.slice(2, 5)}.${s.slice(5, 8)}-${dv}`;
}

function gerarDataNascimento(idadeMin = 18, idadeMax = 65): { texto: string; dia: number; mes: number } {
  const ano = new Date().getFullYear() - rand(idadeMin, idadeMax);
  const mes = rand(1, 12);
  const diasNoMes = new Date(ano, mes, 0).getDate();
  const dia = rand(1, diasNoMes);
  return { texto: `${pad(dia)}/${pad(mes)}/${ano}`, dia, mes };
}

function obterSigno(dia: number, mes: number): string {
  const d = mes * 100 + dia; // ex.: 21/03 -> 321
  if (d >= 321 && d <= 419) return 'Áries';
  if (d >= 420 && d <= 520) return 'Touro';
  if (d >= 521 && d <= 620) return 'Gêmeos';
  if (d >= 621 && d <= 722) return 'Câncer';
  if (d >= 723 && d <= 822) return 'Leão';
  if (d >= 823 && d <= 922) return 'Virgem';
  if (d >= 923 && d <= 1022) return 'Libra';
  if (d >= 1023 && d <= 1121) return 'Escorpião';
  if (d >= 1122 && d <= 1221) return 'Sagitário';
  if (d >= 1222 || d <= 119) return 'Capricórnio';
  if (d >= 120 && d <= 218) return 'Aquário';
  return 'Peixes'; // 19/02 a 20/03
}

function gerarSenha(tamanho = 12): string {
  const minusculas = 'abcdefghijkmnpqrstuvwxyz';
  const maiusculas = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
  const numeros = '23456789';
  const simbolos = '!@#$%&*?';
  const todos = minusculas + maiusculas + numeros + simbolos;

  const chars = [pick([...minusculas]), pick([...maiusculas]), pick([...numeros]), pick([...simbolos])];
  while (chars.length < tamanho) chars.push(pick([...todos]));

  // embaralha (Fisher-Yates)
  for (let i = chars.length - 1; i > 0; i--) {
    const j = rand(0, i);
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }
  return chars.join('');
}

function gerarCelular(ddd: string): string {
  return `(${ddd}) 9${rand(6, 9)}${rand(0, 9)}${rand(0, 9)}${rand(0, 9)}-${pad(rand(0, 9999), 4)}`;
}

// ---------- função principal ----------

export function gerarDados(opcoes: { sexo?: 'Masculino' | 'Feminino' } = {}): DadosFake {
  const sexo = opcoes.sexo ?? pick<'Masculino' | 'Feminino'>(['Masculino', 'Feminino']);

  const sobrenome1 = pick(SOBRENOMES);
  const sobrenome2 = pick(SOBRENOMES.filter((s) => s !== sobrenome1));
  const nomeProprio = pick(sexo === 'Masculino' ? NOMES_M : NOMES_F);
  const nome = `${nomeProprio} ${sobrenome1} ${sobrenome2}`;

  const mae = `${pick(NOMES_F)} ${pick(SOBRENOMES)} ${sobrenome1}`;
  const pai = `${pick(NOMES_M)} ${pick(SOBRENOMES)} ${sobrenome2}`;

  const nasc = gerarDataNascimento();
  const local = pick(LOCAIS);

  const email = `${semAcento(nomeProprio).toLowerCase()}.${semAcento(sobrenome1).toLowerCase()}${rand(10, 999)}@exemplo.com`;

  return {
    nome,
    cpf: gerarCPF(),
    rg: gerarRG(),
    dataNascimento: nasc.texto,
    sexo,
    signo: obterSigno(nasc.dia, nasc.mes),
    filiacao: mae,
    pai,
    email,
    senha: gerarSenha(),
    cep: local.cep,
    endereco: `${local.endereco}, ${rand(1, 2000)}`,
    bairro: local.bairro,
    cidade: local.cidade,
    estado: local.estado,
    celular: gerarCelular(local.ddd),
    altura: (rand(150, 200) / 100).toFixed(2).replace('.', ','),
    peso: String(rand(50, 110)),
    tipoSanguineo: pick(TIPOS_SANGUINEOS),
    cor: pick(CORES),
  };
}

/*
 * Exemplo de uso em um teste Playwright:
 *
 * import { test, expect } from '@playwright/test';
 * import { gerarDadosFake } from './gerarDadosFake';
 *
 * test('preenche o formulário com dados fake', async ({ page }) => {
 *   const dados = gerarDadosFake();
 *   await page.goto('file:///caminho/para/index.html');
 *
 *   await page.fill('#nome', dados.nome);
 *   await page.fill('#cpf', dados.cpf);
 *   await page.fill('#rg', dados.rg);
 *   await page.fill('#dataNascimento', dados.dataNascimento);
 *   await page.selectOption('#sexo', dados.sexo);
 *   await page.fill('#email', dados.email);
 *   await page.fill('#senha', dados.senha);
 *   await page.fill('#cep', dados.cep);
 *   await page.fill('#celular', dados.celular);
 * });
 */