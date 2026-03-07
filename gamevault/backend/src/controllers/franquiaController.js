const db = require('../database/connection');

const franquiaController = {
    // Listar todas as franquias
    async listar(req, res) {
        try {
            const result = await db.query('SELECT * FROM franquias ORDER BY nome');
            res.json(result.rows);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao listar franquias' });
        }
    },

    // Buscar franquia por ID
    async buscarPorId(req, res) {
        const { id } = req.params;
        try {
            const result = await db.query('SELECT * FROM franquias WHERE id = $1', [id]);
            if (result.rows.length === 0) {
                return res.status(404).json({ message: 'Franquia não encontrada' });
            }
            res.json(result.rows[0]);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao buscar franquia' });
        }
    },

    // Criar nova franquia
    async criar(req, res) {
        const { nome, desenvolvedora, ano_inicio } = req.body;
        
        if (!nome || nome.trim() === '') {
            return res.status(400).json({ message: 'Nome da franquia é obrigatório' });
        }

        try {
            const result = await db.query(
                'INSERT INTO franquias (nome, desenvolvedora, ano_inicio) VALUES ($1, $2, $3) RETURNING *',
                [nome.trim(), desenvolvedora, ano_inicio]
            );
            res.status(201).json(result.rows[0]);
        } catch (error) {
            if (error.code === '23505') {
                return res.status(400).json({ message: 'Esta franquia já existe' });
            }
            console.error(error);
            res.status(500).json({ message: 'Erro ao criar franquia' });
        }
    },

    // Atualizar franquia
    async atualizar(req, res) {
        const { id } = req.params;
        const { nome, desenvolvedora, ano_inicio } = req.body;

        if (!nome || nome.trim() === '') {
            return res.status(400).json({ message: 'Nome da franquia é obrigatório' });
        }

        try {
            const result = await db.query(
                'UPDATE franquias SET nome = $1, desenvolvedora = $2, ano_inicio = $3 WHERE id = $4 RETURNING *',
                [nome.trim(), desenvolvedora, ano_inicio, id]
            );
            if (result.rows.length === 0) {
                return res.status(404).json({ message: 'Franquia não encontrada' });
            }
            res.json(result.rows[0]);
        } catch (error) {
            if (error.code === '23505') {
                return res.status(400).json({ message: 'Esta franquia já existe' });
            }
            console.error(error);
            res.status(500).json({ message: 'Erro ao atualizar franquia' });
        }
    },

    // Deletar franquia
    async deletar(req, res) {
        const { id } = req.params;
        try {
            const result = await db.query('DELETE FROM franquias WHERE id = $1 RETURNING *', [id]);
            if (result.rows.length === 0) {
                return res.status(404).json({ message: 'Franquia não encontrada' });
            }
            res.json({ message: 'Franquia removida com sucesso' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao deletar franquia' });
        }
    }
};

module.exports = franquiaController;
