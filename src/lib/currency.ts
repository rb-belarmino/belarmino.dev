export function formatBRL(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

const UNIDADES = ["", "um", "dois", "três", "quatro", "cinco", "seis", "sete", "oito", "nove"];
const ESPECIAIS = ["dez", "onze", "doze", "treze", "quatorze", "quinze", "dezesseis", "dezessete", "dezoito", "dezenove"];
const DEZENAS = ["", "", "vinte", "trinta", "quarenta", "cinquenta", "sessenta", "setenta", "oitenta", "noventa"];
const CENTENAS = ["", "cento", "duzentos", "trezentos", "quatrocentos", "quinhentos", "seiscentos", "setecentos", "oitocentos", "novecentos"];

function converterCentena(n: number): string {
  if (n === 100) return "cem";
  const c = Math.floor(n / 100);
  const d = Math.floor((n % 100) / 10);
  const u = n % 10;

  const partes: string[] = [];

  if (c > 0) partes.push(CENTENAS[c]);

  if (d === 1) {
    partes.push(ESPECIAIS[u]);
  } else {
    if (d > 1) partes.push(DEZENAS[d]);
    if (u > 0) partes.push(UNIDADES[u]);
  }

  return partes.join(" e ");
}

export function numberToWordsBRL(valor: number): string {
  if (valor === 0) return "zero reais";

  const inteiro = Math.floor(valor);
  const centavos = Math.round((valor - inteiro) * 100);

  const partesTexto: string[] = [];

  // Milhões
  const milhoes = Math.floor(inteiro / 1000000);
  const restoMilhoes = inteiro % 1000000;

  if (milhoes > 0) {
    const textoMilhoes = converterCentena(milhoes);
    partesTexto.push(milhoes === 1 ? `${textoMilhoes} milhão` : `${textoMilhoes} milhões`);
  }

  // Milhares
  const milhares = Math.floor(restoMilhoes / 1000);
  const unidadesRestantes = restoMilhoes % 1000;

  if (milhares > 0) {
    const textoMilhares = converterCentena(milhares);
    partesTexto.push(milhares === 1 ? "um mil" : `${textoMilhares} mil`);
  }

  // Centenas/Unidades
  if (unidadesRestantes > 0) {
    partesTexto.push(converterCentena(unidadesRestantes));
  }

  let resultado = "";
  if (inteiro > 0) {
    const textoInteiro = partesTexto.join(" e ");
    resultado = `${textoInteiro} ${inteiro === 1 ? "real" : "reais"}`;
  }

  if (centavos > 0) {
    const textoCentavos = converterCentena(centavos);
    const complementoCentavos = `${textoCentavos} ${centavos === 1 ? "centavo" : "centavos"}`;
    resultado = resultado ? `${resultado} e ${complementoCentavos}` : complementoCentavos;
  }

  return resultado;
}
