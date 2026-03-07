import React, { useState, useEffect } from 'react';
import GeneroForm from '../components/GeneroForm';
import api from '../services/api';

function GenerosPage() {
    const [generos, setGeneros] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingGenero, setEditingGenero] = useState(null);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        loadGeneros();
    }, []);

    const loadGeneros = async () => {
        setLoading(true);
        try {
            const response = await api.get('/generos');
            setGeneros(response.data);
        } catch (error) {
            showMessage('error', 'Erro ao carregar gêneros');
        } finally {
            setLoading(false);
        }
    };

    const showMessage = (type, text) => {
        setMessage({ type, text });
        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    };

    const handleSave = async (generoData) => {
        try {
            if (editingGenero) {
                const response = await api.put(`/generos/${editingGenero.id}`, generoData);
                setGeneros(generos.map(g => g.id === editingGenero.id ? response.data : g));
                showMessage('success', 'Gênero atualizado com sucesso!');
            } else {
                const response = await api.post('/generos', generoData);
                setGeneros([...generos, response.data]);
                showMessage('success', 'Gênero cadastrado com sucesso!');
            }
            setShowForm(false);
            setEditingGenero(null);
        } catch (error) {
            showMessage('error', error.response?.data?.message || 'Erro ao salvar gênero');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Tem certeza que deseja excluir este gênero?')) {
            try {
                await api.delete(`/generos/${id}`);
                setGeneros(generos.filter(g => g.id !== id));
                showMessage('success', 'Gênero excluído com sucesso!');
            } catch (error) {
                showMessage('error', 'Erro ao excluir gênero');
            }
        }
    };

    if (loading) {
        return <div className="loading">Carregando...</div>;
    }

    return (
        <div className="generos-page">
            <h1>Gerenciar Gêneros</h1>
            
            {message.text && (
                <div className={`alert alert-${message.type}`}>
                    {message.text}
                </div>
            )}

            <button 
                className="btn btn-primary" 
                onClick={() => {
                    setShowForm(!showForm);
                    setEditingGenero(null);
                }}
            >
                {showForm ? 'Cancelar' : 'Novo Gênero'}
            </button>

            {showForm && (
                <GeneroForm 
                    onSave={handleSave}
                    onCancel={() => {
                        setShowForm(false);
                        setEditingGenero(null);
                    }}
                    editingGenero={editingGenero}
                />
            )}

            <div className="card-container">
                {generos.map(genero => (
                    <div key={genero.id} className="card">
                        <h3>{genero.nome}</h3>
                        <p className="card-info">{genero.descricao || 'Sem descrição'}</p>
                        <div className="card-actions">
                            <button 
                                className="btn btn-secondary"
                                onClick={() => {
                                    setEditingGenero(genero);
                                    setShowForm(true);
                                }}
                            >
                                Editar
                            </button>
                            <button 
                                className="btn btn-danger"
                                onClick={() => handleDelete(genero.id)}
                            >
                                Excluir
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default GenerosPage;
