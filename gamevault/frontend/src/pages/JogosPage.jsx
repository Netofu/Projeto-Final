import React, { useState, useEffect } from 'react';
import JogoList from '../components/JogoList';
import JogoForm from '../components/JogoForm';
import api from '../services/api';

function JogosPage() {
    const [jogos, setJogos] = useState([]);
    const [generos, setGeneros] = useState([]);
    const [franquias, setFranquias] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingJogo, setEditingJogo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        try {
            const [jogosRes, generosRes, franquiasRes] = await Promise.all([
                api.get('/jogos'),
                api.get('/generos'),
                api.get('/franquias')
            ]);
            setJogos(jogosRes.data);
            setGeneros(generosRes.data);
            setFranquias(franquiasRes.data);
        } catch (error) {
            showMessage('error', 'Erro ao carregar dados');
        } finally {
            setLoading(false);
        }
    };

    const showMessage = (type, text) => {
        setMessage({ type, text });
        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    };

    const handleSave = async (jogoData) => {
        try {
            if (editingJogo) {
                const response = await api.put(`/jogos/${editingJogo.id}`, jogoData);
                setJogos(jogos.map(j => j.id === editingJogo.id ? response.data : j));
                showMessage('success', 'Jogo atualizado com sucesso!');
            } else {
                const response = await api.post('/jogos', jogoData);
                setJogos([...jogos, response.data]);
                showMessage('success', 'Jogo cadastrado com sucesso!');
            }
            setShowForm(false);
            setEditingJogo(null);
        } catch (error) {
            showMessage('error', error.response?.data?.message || 'Erro ao salvar jogo');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Tem certeza que deseja excluir este jogo?')) {
            try {
                await api.delete(`/jogos/${id}`);
                setJogos(jogos.filter(j => j.id !== id));
                showMessage('success', 'Jogo excluído com sucesso!');
            } catch (error) {
                showMessage('error', 'Erro ao excluir jogo');
            }
        }
    };

    const handleEdit = (jogo) => {
        setEditingJogo(jogo);
        setShowForm(true);
    };

    if (loading) {
        return <div className="loading">Carregando...</div>;
    }

    return (
        <div className="jogos-page">
            <h1>Gerenciar Jogos</h1>
            
            {message.text && (
                <div className={`alert alert-${message.type}`}>
                    {message.text}
                </div>
            )}

            <button 
                className="btn btn-primary" 
                onClick={() => {
                    setShowForm(!showForm);
                    setEditingJogo(null);
                }}
            >
                {showForm ? 'Cancelar' : 'Novo Jogo'}
            </button>

            {showForm && (
                <JogoForm 
                    onSave={handleSave}
                    onCancel={() => {
                        setShowForm(false);
                        setEditingJogo(null);
                    }}
                    editingJogo={editingJogo}
                    generos={generos}
                    franquias={franquias}
                />
            )}

            <JogoList 
                jogos={jogos} 
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
        </div>
    );
}

export default JogosPage;
