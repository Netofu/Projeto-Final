import React, { useState, useEffect } from 'react';

function GeneroForm({ onSave, onCancel, editingGenero }) {
    const [formData, setFormData] = useState({
        nome: '',
        descricao: ''
    });

    useEffect(() => {
        if (editingGenero) {
            setFormData({
                nome: editingGenero.nome || '',
                descricao: editingGenero.descricao || ''
            });
        }
    }, [editingGenero]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="form-container">
            <h2>{editingGenero ? 'Editar Gênero' : 'Novo Gênero'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Nome do Gênero *</label>
                    <input
                        type="text"
                        name="nome"
                        value={formData.nome}
                        onChange={handleChange}
                        required
                        placeholder="Ex: Ação, RPG, Aventura"
                    />
                </div>

                <div className="form-group">
                    <label>Descrição</label>
                    <textarea
                        name="descricao"
                        value={formData.descricao}
                        onChange={handleChange}
                        rows="3"
                        placeholder="Descreva as características deste gênero"
                    />
                </div>

                <div className="form-actions">
                    <button type="submit" className="btn btn-success">
                        {editingGenero ? 'Atualizar' : 'Salvar'}
                    </button>
                    <button type="button" className="btn btn-secondary" onClick={onCancel}>
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
}

export default GeneroForm;
