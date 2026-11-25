import express from 'express';
import cors from 'cors';
import { calcularImc } from './imc.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.post('/api/imc', (req, res) => {
  const { peso, altura } = req.body ?? {};

  try {
    const resultado = calcularImc(peso, altura);
    res.json({
      peso: Number(peso),
      altura: Number(altura),
      ...resultado,
    });
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`API de IMC rodando em http://localhost:${PORT}`);
});
