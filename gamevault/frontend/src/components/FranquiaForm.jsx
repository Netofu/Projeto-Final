import React, { useState, useEffect } from 'react';

function FranquiaForm({ onSave, onCancel, editingFranquia }) {
    const [formData, setFormData] = useState({
        nome: '',
        desenvolvedora: '',
        ano_inicio: ''
    });

    useEffect(() => {
        if (editingFranquia) {
            setFormData({
                nome: editingFranquia.nome || '',
                desenvolvedora: editingFranquia.desenvolvedora || '',
                ano_inicio: editingFranquia.ano_inicio || ''
            });
        }
    }, [editingFranquia]);

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
            <h2>{editingFranquia ? 'Editar Franquia' : 'Nova Franquia'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Nome da Franquia *</label>
                    <input
                        type="text"
                        name="nome"
                        value={formData.nome}
                        onChange={handleChange}
                        required
                        placeholder="Ex: The Legend of Zelda, Final Fantasy"
                    />
                </div>

                <div className="form-group">
                    <label>Desenvolvedora</label>
                    <input
                        type="text"
                        name="desenvolvedora"
                        value={formData.desenvolvedora}
                        onChange={handleChange}
                        placeholder="Ex: Nintendo, Square Enix"
                    />
                </div>

                <div className="form-group">
                    <label>Ano de Início</label>
                    <input
                        type="number"
                        name="ano_inicio"
                        value={formData.ano_inicio}
                        onChange={handleChange}
                        min="1950"
                        max={new Date().getFullYear()}
                        placeholder="Ex: 1986"
                    />
                </div>

                <div className="form-actions">
                    <button type="submit" className="btn btn-success">
                        {editingFranquia ? 'Atualizar' : 'Salvar'}
                    </button>
                    <button type="button" className="btn btn-secondary" onClick={onCancel}>
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
}

export default FranquiaForm;
