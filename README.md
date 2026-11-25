# Calculadora de IMC (React + Node.js)

Projeto de estudo com frontend em **React (Vite)** e API backend em **Node.js (Express)** para cálculo e classificação do IMC (`IMC = Peso / Altura²`).

## Classificações

- **Magreza:** menor que 18,5 kg/m²
- **Normal:** entre 18,5 e 24,9 kg/m²
- **Sobrepeso:** entre 24,9 e 30 kg/m²
- **Obesidade:** maior que 30 kg/m²

## Estrutura

```text
calculadora-imc/
├── backend/
│   ├── src/
│   │   ├── imc.js       # Lógica de cálculo e classificação
│   │   └── server.js    # Servidor Express e rota POST /api/imc
│   └── test/
│       └── imc.test.js  # Testes unitários com node:test
└── frontend/
    ├── src/
    │   ├── App.jsx      # Formulário, chamada à API e exibição do resultado
    │   └── App.css      # Estilização
    └── vite.config.js   # Proxy de /api para http://localhost:3001
```

## Como executar

### 1. Backend (API)

```bash
cd backend
npm install
npm run dev
```

A API ficará disponível em `http://localhost:3001`.

Para rodar os testes do backend:

```bash
cd backend
npm test
```

### 2. Frontend (React)

Em outro terminal:

```bash
cd frontend
npm install
npm run dev
```

Acesse `http://localhost:5173` no navegador.
