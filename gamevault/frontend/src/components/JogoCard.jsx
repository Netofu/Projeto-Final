import React from 'react';

function JogoCard({ jogo, onEdit, onDelete }) {
    return (
        <div className="card">
            <h3>{jogo.nome}</h3>
            <div className="card-info">
                <p><strong>Ano:</strong> {jogo.ano_lancamento}</p>
                <p><strong>Gênero:</strong> {jogo.genero_nome || 'Não definido'}</p>
                <p><strong>Franquia:</strong> {jogo.franquia_nome || 'Não definida'}</p>
                <p><strong>Setting:</strong> {jogo.setting || 'Não definido'}</p>
            </div>
            <div className="card-actions">
                <button 
                    className="btn btn-secondary"
                    onClick={() => onEdit(jogo)}
                >
                    Editar
                </button>
                <button 
                    className="btn btn-danger"
                    onClick={() => onDelete(jogo.id)}
                >
                    Excluir
                </button>
            </div>
        </div>
    );
}

export default JogoCard;
