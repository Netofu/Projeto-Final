const db = require('../database/connection');

const jogoController = {
    // Listar todos os jogos com informações relacionadas
    async listar(req, res) {
        try {
            const query = `
                SELECT j.*, g.nome as genero_nome, f.nome as franquia_nome,
                       f.desenvolvedora, f.ano_inicio as franquia_ano_inicio
                FROM jogos j
                LEFT JOIN generos g ON j.genero_id = g.id
                LEFT JOIN franquias f ON j.franquia_id = f.id
                ORDER BY j.nome
            `;
            const result = await db.query(query);
            res.json(result.rows);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao listar jogos' });
        }
    },

    // Buscar jogo por ID
    async buscarPorId(req, res) {
        const { id } = req.params;
        try {
            const query = `
                SELECT j.*, g.nome as genero_nome, f.nome as franquia_nome,
                       f.desenvolvedora, f.ano_inicio as franquia_ano_inicio
                FROM jogos j
                LEFT JOIN generos g ON j.genero_id = g.id
                LEFT JOIN franquias f ON j.franquia_id = f.id
                WHERE j.id = $1
            `;
            const result = await db.query(query, [id]);
            if (result.rows.length === 0) {
                return res.status(404).json({ message: 'Jogo não encontrado' });
            }
            res.json(result.rows[0]);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao buscar jogo' });
        }
    },

    // Criar novo jogo
    async criar(req, res) {
        const { nome, ano_lancamento, setting, genero_id, franquia_id } = req.body;
        
        // Validações
        if (!nome || nome.trim() === '') {
            return res.status(400).json({ message: 'Nome do jogo é obrigatório' });
        }
        if (!ano_lancamento) {
            return res.status(400).json({ message: 'Ano de lançamento é obrigatório' });
        }
        if (ano_lancamento < 1950 || ano_lancamento > new Date().getFullYear() + 2) {
            return res.status(400).json({ message: 'Ano de lançamento inválido' });
        }

        try {
            const result = await db.query(
                `INSERT INTO jogos (nome, ano_lancamento, setting, genero_id, franquia_id) 
                 VALUES ($1, $2, $3, $4, $5) RETURNING *`,
                [nome.trim(), ano_lancamento, setting, genero_id || null, franquia_id || null]
            );
            
            // Buscar o jogo com os relacionamentos
            const jogoCompleto = await db.query(
                `SELECT j.*, g.nome as genero_nome, f.nome as franquia_nome
                 FROM jogos j
                 LEFT JOIN generos g ON j.genero_id = g.id
                 LEFT JOIN franquias f ON j.franquia_id = f.id
                 WHERE j.id = $1`,
                [result.rows[0].id]
            );
            
            res.status(201).json(jogoCompleto.rows[0]);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao criar jogo' });
        }
    },

    // Atualizar jogo
    async atualizar(req, res) {
        const { id } = req.params;
        const { nome, ano_lancamento, setting, genero_id, franquia_id } = req.body;

        // Validações
        if (!nome || nome.trim() === '') {
            return res.status(400).json({ message: 'Nome do jogo é obrigatório' });
        }
        if (!ano_lancamento) {
            return res.status(400).json({ message: 'Ano de lançamento é obrigatório' });
        }

        try {
            const result = await db.query(
                `UPDATE jogos 
                 SET nome = $1, ano_lancamento = $2, setting = $3, 
                     genero_id = $4, franquia_id = $5 
                 WHERE id = $6 RETURNING *`,
                [nome.trim(), ano_lancamento, setting, genero_id || null, franquia_id || null, id]
            );
            
            if (result.rows.length === 0) {
                return res.status(404).json({ message: 'Jogo não encontrado' });
            }

            // Buscar o jogo atualizado com os relacionamentos
            const jogoAtualizado = await db.query(
                `SELECT j.*, g.nome as genero_nome, f.nome as franquia_nome
                 FROM jogos j
                 LEFT JOIN generos g ON j.genero_id = g.id
                 LEFT JOIN franquias f ON j.franquia_id = f.id
                 WHERE j.id = $1`,
                [id]
            );
            
            res.json(jogoAtualizado.rows[0]);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao atualizar jogo' });
        }
    },

    // Deletar jogo
    async deletar(req, res) {
        const { id } = req.params;
        try {
            const result = await db.query('DELETE FROM jogos WHERE id = $1 RETURNING *', [id]);
            if (result.rows.length === 0) {
                return res.status(404).json({ message: 'Jogo não encontrado' });
            }
            res.json({ message: 'Jogo removido com sucesso' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao deletar jogo' });
        }
    },

    // Listar jogos por gênero
    async listarPorGenero(req, res) {
        const { generoId } = req.params;
        try {
            const query = `
                SELECT j.*, g.nome as genero_nome, f.nome as franquia_nome
                FROM jogos j
                LEFT JOIN generos g ON j.genero_id = g.id
                LEFT JOIN franquias f ON j.franquia_id = f.id
                WHERE j.genero_id = $1
                ORDER BY j.nome
            `;
            const result = await db.query(query, [generoId]);
            res.json(result.rows);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao listar jogos por gênero' });
        }
    }
};

module.exports = jogoController;
