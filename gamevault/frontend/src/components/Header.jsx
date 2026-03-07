import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">GameVault</Link>
        <nav className="nav-menu">
          <Link to="/">Home</Link>
          <Link to="/jogos">Jogos</Link>
          <Link to="/generos">Gêneros</Link>
          <Link to="/franquias">Franquias</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
