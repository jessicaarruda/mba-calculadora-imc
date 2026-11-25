/**
 * Classifica o valor do IMC de acordo com a tabela de referência.
 *
 * @param {number} imc
 * @returns {'Magreza' | 'Normal' | 'Sobrepeso' | 'Obesidade'}
 */
export function classificarImc(imc) {
  if (imc < 18.5) return 'Magreza';
  if (imc <= 24.9) return 'Normal';
  if (imc <= 30) return 'Sobrepeso';
  return 'Obesidade';
}

/**
 * Calcula o IMC (Peso / Altura²) e retorna o valor arredondado e a classificação.
 *
 * @param {number} peso - Peso em quilogramas (kg)
 * @param {number} altura - Altura em metros (m)
 * @returns {{ imc: number, classificacao: string }}
 */
export function calcularImc(peso, altura) {
  const pesoNum = Number(peso);
  const alturaNum = Number(altura);

  if (!Number.isFinite(pesoNum) || pesoNum <= 0) {
    throw new Error('O peso deve ser um número maior que zero.');
  }

  if (!Number.isFinite(alturaNum) || alturaNum <= 0) {
    throw new Error('A altura deve ser um número maior que zero.');
  }

  const imcBruto = pesoNum / (alturaNum * alturaNum);
  const imc = Number(imcBruto.toFixed(2));
  const classificacao = classificarImc(imc);

  return { imc, classificacao };
}
