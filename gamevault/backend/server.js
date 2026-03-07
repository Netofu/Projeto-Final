const express = require('express');
const cors = require('cors');
require('dotenv').config();

const jogoRoutes = require('./src/routes/jogoRoutes');
const generoRoutes = require('./src/routes/generoRoutes');
const franquiaRoutes = require('./src/routes/franquiaRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas
app.use('/api/jogos', jogoRoutes);
app.use('/api/generos', generoRoutes);
app.use('/api/franquias', franquiaRoutes);

// Rota de teste
app.get('/', (req, res) => {
    res.json({ message: 'API GameVault funcionando!' });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
