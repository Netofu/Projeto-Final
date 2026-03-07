import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import JogosPage from './pages/JogosPage';
import GenerosPage from './pages/GenerosPage';
import FranquiasPage from './pages/FranquiasPage';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/jogos" element={<JogosPage />} />
            <Route path="/generos" element={<GenerosPage />} />
            <Route path="/franquias" element={<FranquiasPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
