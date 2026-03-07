import React, { useState, useEffect } from 'react';
import FranquiaForm from '../components/FranquiaForm';
import api from '../services/api';

function FranquiasPage() {
    const [franquias, setFranquias] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingFranquia, setEditingFranquia] = useState(null);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        loadFranquias();
    }, []);

    const loadFranquias = async () => {
        setLoading(true);
        try {
            const response = await api.get('/franquias');
            setFranquias(response.data);
        } catch (error) {
            showMessage('error', 'Erro ao carregar franquias');
        } finally {
            setLoading(false);
        }
    };

    const showMessage = (type, text) => {
        setMessage({ type, text });
        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    };

    const handleSave = async (franquiaData) => {
        try {
            if (editingFranquia) {
                const response = await api.put(`/franquias/${editingFranquia.id}`, franquiaData);
                setFranquias(franquias.map(f => f.id === editingFranquia.id ? response.data : f));
                showMessage('success', 'Franquia atualizada com sucesso!');
            } else {
                const response = await api.post('/franquias', franquiaData);
                setFranquias([...franquias, response.data]);
                showMessage('success', 'Franquia cadastrada com sucesso!');
            }
            setShowForm(false);
            setEditingFranquia(null);
        } catch (error) {
            showMessage('error', error.response?.data?.message || 'Erro ao salvar franquia');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Tem certeza que deseja excluir esta franquia?')) {
            try {
                await api.delete(`/franquias/${id}`);
                setFranquias(franquias.filter(f => f.id !== id));
                showMessage('success', 'Franquia excluída com sucesso!');
            } catch (error) {
                showMessage('error', 'Erro ao excluir franquia');
            }
        }
    };

    if (loading) {
        return <div className="loading">Carregando...</div>;
    }

    return (
        <div className="franquias-page">
            <h1>Gerenciar Franquias</h1>
            
            {message.text && (
                <div className={`alert alert-${message.type}`}>
                    {message.text}
                </div>
            )}

            <button 
                className="btn btn-primary" 
                onClick={() => {
                    setShowForm(!showForm);
                    setEditingFranquia(null);
                }}
            >
                {showForm ? 'Cancelar' : 'Nova Franquia'}
            </button>

            {showForm && (
                <FranquiaForm 
                    onSave={handleSave}
                    onCancel={() => {
                        setShowForm(false);
                        setEditingFranquia(null);
                    }}
                    editingFranquia={editingFranquia}
                />
            )}

            <div className="card-container">
                {franquias.map(franquia => (
                    <div key={franquia.id} className="card">
                        <h3>{franquia.nome}</h3>
                        <p className="card-info">
                            <strong>Desenvolvedora:</strong> {franquia.desenvolvedora || 'Não informada'}<br/>
                            <strong>Ano de início:</strong> {franquia.ano_inicio || 'Não informado'}
                        </p>
                        <div className="card-actions">
                            <button 
                                className="btn btn-secondary"
                                onClick={() => {
                                    setEditingFranquia(franquia);
                                    setShowForm(true);
                                }}
                            >
                                Editar
                            </button>
                            <button 
                                className="btn btn-danger"
                                onClick={() => handleDelete(franquia.id)}
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

export default FranquiasPage;
