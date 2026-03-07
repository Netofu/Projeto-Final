-- Criar tabela de gêneros
CREATE TABLE IF NOT EXISTS generos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL UNIQUE,
    descricao TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Criar tabela de franquias
CREATE TABLE IF NOT EXISTS franquias (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(200) NOT NULL UNIQUE,
    desenvolvedora VARCHAR(200),
    ano_inicio INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Criar tabela de jogos
CREATE TABLE IF NOT EXISTS jogos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(200) NOT NULL,
    ano_lancamento INTEGER NOT NULL,
    setting VARCHAR(100),
    genero_id INTEGER REFERENCES generos(id) ON DELETE SET NULL,
    franquia_id INTEGER REFERENCES franquias(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inserir dados de exemplo
INSERT INTO generos (nome, descricao) VALUES
    ('Ação', 'Jogos focados em combate e reflexos rápidos'),
    ('RPG', 'Jogos com foco em narrativa e desenvolvimento de personagens'),
    ('Aventura', 'Jogos com foco em exploração e história')
ON CONFLICT (nome) DO NOTHING;

INSERT INTO franquias (nome, desenvolvedora, ano_inicio) VALUES
    ('The Legend of Zelda', 'Nintendo', 1986),
    ('Final Fantasy', 'Square Enix', 1987),
    ('God of War', 'Santa Monica Studio', 2005)
ON CONFLICT (nome) DO NOTHING;
