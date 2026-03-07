import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="home-page">
      <div className="hero-section">
        <h1>Bem-vindo ao GameVault</h1>
        <p>Seu sistema pessoal para organizar e gerenciar sua coleção de jogos</p>
        <Link to="/jogos" className="btn btn-primary">Começar Agora</Link>
      </div>

      <div className="features">
        <div className="feature">
          <h3>🎮 Gerenciar Jogos</h3>
          <p>Cadastre, edite e organize todos os seus jogos em um só lugar</p>
        </div>
        <div className="feature">
          <h3>🏷️ Categorias</h3>
          <p>Organize por gêneros e encontre jogos similares facilmente</p>
        </div>
        <div className="feature">
          <h3>📚 Franquias</h3>
          <p>Acompanhe séries de jogos e suas desenvolvedoras</p>
        </div>
        <div className="feature">
          <h3>🔍 Busca Avançada</h3>
          <p>Encontre jogos por ano, gênero, franquia e mais</p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
