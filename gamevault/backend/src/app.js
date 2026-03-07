const express = require('express');
const cors = require('cors');
require('dotenv').config();

const jogoRoutes = require('./routes/jogoRoutes');
const generoRoutes = require('./routes/generoRoutes');
const franquiaRoutes = require('./routes/franquiaRoutes');

const app = express();

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
    res.json({ 
        message: 'API GameVault funcionando!',
        version: '1.0.0',
        endpoints: {
            jogos: '/api/jogos',
            generos: '/api/generos',
            franquias: '/api/franquias'
        }
    });
});

// Middleware para rotas não encontradas
app.use((req, res) => {
    res.status(404).json({ message: 'Rota não encontrada' });
});

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        message: 'Erro interno do servidor',
        error: process.env.NODE_ENV === 'development' ? err.message : {}
    });
});

module.exports = app;
