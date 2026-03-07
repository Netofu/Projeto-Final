const db = require('../database/connection');

const generoController = {
    // Listar todos os gêneros
    async listar(req, res) {
        try {
            const result = await db.query('SELECT * FROM generos ORDER BY nome');
            res.json(result.rows);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao listar gêneros' });
        }
    },

    // Buscar gênero por ID
    async buscarPorId(req, res) {
        const { id } = req.params;
        try {
            const result = await db.query('SELECT * FROM generos WHERE id = $1', [id]);
            if (result.rows.length === 0) {
                return res.status(404).json({ message: 'Gênero não encontrado' });
            }
            res.json(result.rows[0]);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao buscar gênero' });
        }
    },

    // Criar novo gênero
    async criar(req, res) {
        const { nome, descricao } = req.body;
        
        if (!nome || nome.trim() === '') {
            return res.status(400).json({ message: 'Nome do gênero é obrigatório' });
        }

        try {
            const result = await db.query(
                'INSERT INTO generos (nome, descricao) VALUES ($1, $2) RETURNING *',
                [nome.trim(), descricao]
            );
            res.status(201).json(result.rows[0]);
        } catch (error) {
            if (error.code === '23505') {
                return res.status(400).json({ message: 'Este gênero já existe' });
            }
            console.error(error);
            res.status(500).json({ message: 'Erro ao criar gênero' });
        }
    },

    // Atualizar gênero
    async atualizar(req, res) {
        const { id } = req.params;
        const { nome, descricao } = req.body;

        if (!nome || nome.trim() === '') {
            return res.status(400).json({ message: 'Nome do gênero é obrigatório' });
        }

        try {
            const result = await db.query(
                'UPDATE generos SET nome = $1, descricao = $2 WHERE id = $3 RETURNING *',
                [nome.trim(), descricao, id]
            );
            if (result.rows.length === 0) {
                return res.status(404).json({ message: 'Gênero não encontrado' });
            }
            res.json(result.rows[0]);
        } catch (error) {
            if (error.code === '23505') {
                return res.status(400).json({ message: 'Este gênero já existe' });
            }
            console.error(error);
            res.status(500).json({ message: 'Erro ao atualizar gênero' });
        }
    },

    // Deletar gênero
    async deletar(req, res) {
        const { id } = req.params;
        try {
            const result = await db.query('DELETE FROM generos WHERE id = $1 RETURNING *', [id]);
            if (result.rows.length === 0) {
                return res.status(404).json({ message: 'Gênero não encontrado' });
            }
            res.json({ message: 'Gênero removido com sucesso' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao deletar gênero' });
        }
    }
};

module.exports = generoController;
