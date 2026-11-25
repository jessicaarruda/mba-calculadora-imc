import test from 'node:test';
import assert from 'node:assert/strict';
import { calcularImc, classificarImc } from '../src/imc.js';

test('classificarImc retorna as classificações esperadas', () => {
  assert.equal(classificarImc(17.5), 'Magreza');
  assert.equal(classificarImc(18.5), 'Normal');
  assert.equal(classificarImc(24.9), 'Normal');
  assert.equal(classificarImc(25.0), 'Sobrepeso');
  assert.equal(classificarImc(30.0), 'Sobrepeso');
  assert.equal(classificarImc(30.1), 'Obesidade');
});

test('calcularImc calcula Peso / Altura² corretamente', () => {
  const resultado = calcularImc(70, 1.75);
  assert.equal(resultado.imc, 22.86);
  assert.equal(resultado.classificacao, 'Normal');
});

test('calcularImc lança erro para valores inválidos', () => {
  assert.throws(() => calcularImc(0, 1.75), /peso/i);
  assert.throws(() => calcularImc(70, -1.75), /altura/i);
  assert.throws(() => calcularImc('abc', 1.75), /peso/i);
});
