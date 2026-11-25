import { useState } from 'react';
import './App.css';

const FAIXAS_IMC = [
  { faixa: 'Menor que 18,5 kg/m²', classificacao: 'Magreza' },
  { faixa: 'Entre 18,5 e 24,9 kg/m²', classificacao: 'Normal' },
  { faixa: 'Entre 24,9 e 30 kg/m²', classificacao: 'Sobrepeso' },
  { faixa: 'Maior que 30 kg/m²', classificacao: 'Obesidade' },
];

const CLASSE_BADGE = {
  Magreza: 'badge-magreza',
  Normal: 'badge-normal',
  Sobrepeso: 'badge-sobrepeso',
  Obesidade: 'badge-obesidade',
};

export default function App() {
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [resultado, setResultado] = useState(null);
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setErro('');
    setResultado(null);

    const pesoNormalizado = Number(peso.replace(',', '.'));
    const alturaNormalizada = Number(altura.replace(',', '.'));

    if (!peso || !altura) {
      setErro('Preencha os campos de peso e altura.');
      return;
    }

    setCarregando(true);
    try {
      const response = await fetch('/api/imc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          peso: pesoNormalizado,
          altura: alturaNormalizada,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErro(data.erro || 'Não foi possível calcular o IMC.');
        return;
      }

      setResultado(data);
    } catch {
      setErro('Erro ao conectar com a API. Verifique se o backend está rodando.');
    } finally {
      setCarregando(false);
    }
  }

  function handleLimpar() {
    setPeso('');
    setAltura('');
    setResultado(null);
    setErro('');
  }

  return (
    <main className="card">
      <header className="card-header">
        <h1>Calculadora de IMC</h1>
        <p>Informe seu peso e altura para calcular o Índice de Massa Corporal.</p>
      </header>

      <form onSubmit={handleSubmit} className="form">
        <div className="field">
          <label htmlFor="peso">Peso (kg)</label>
          <input
            id="peso"
            type="text"
            inputMode="decimal"
            placeholder="Ex: 70.5"
            value={peso}
            onChange={(e) => setPeso(e.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="altura">Altura (m)</label>
          <input
            id="altura"
            type="text"
            inputMode="decimal"
            placeholder="Ex: 1.75"
            value={altura}
            onChange={(e) => setAltura(e.target.value)}
          />
        </div>

        <div className="actions">
          <button type="submit" className="btn-primary" disabled={carregando}>
            {carregando ? 'Calculando...' : 'Calcular IMC'}
          </button>
          <button type="button" className="btn-secondary" onClick={handleLimpar}>
            Limpar
          </button>
        </div>
      </form>

      {erro && <div className="alert-error">{erro}</div>}

      {resultado && (
        <section className="resultado">
          <div>
            <span className="resultado-label">Seu IMC</span>
            <strong className="resultado-valor">
              {resultado.imc.toFixed(2).replace('.', ',')} kg/m²
            </strong>
          </div>
          <span className={`badge ${CLASSE_BADGE[resultado.classificacao] || ''}`}>
            {resultado.classificacao}
          </span>
        </section>
      )}

      <section className="tabela-section">
        <h2>Tabela de Referência</h2>
        <table className="tabela">
          <thead>
            <tr>
              <th>IMC</th>
              <th>Classificação</th>
            </tr>
          </thead>
          <tbody>
            {FAIXAS_IMC.map((item) => (
              <tr
                key={item.classificacao}
                className={
                  resultado?.classificacao === item.classificacao ? 'linha-ativa' : ''
                }
              >
                <td>{item.faixa}</td>
                <td>{item.classificacao}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}
