import React from 'react';

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p>&copy; {new Date().getFullYear()} GameVault - Todos os direitos reservados</p>
      </div>
    </footer>
  );
}

export default Footer;
