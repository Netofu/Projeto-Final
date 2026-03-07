import React from 'react';
import JogoCard from './JogoCard';

function JogoList({ jogos, onEdit, onDelete }) {
    if (!jogos || jogos.length === 0) {
        return (
            <div className="empty-state">
                <p>Nenhum jogo cadastrado ainda.</p>
            </div>
        );
    }

    return (
        <div className="card-container">
            {jogos.map(jogo => (
                <JogoCard 
                    key={jogo.id} 
                    jogo={jogo} 
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
}

export default JogoList;
