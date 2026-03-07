const express = require('express');
const router = express.Router();
const jogoController = require('../controllers/jogoController');

router.get('/', jogoController.listar);
router.get('/:id', jogoController.buscarPorId);
router.get('/genero/:generoId', jogoController.listarPorGenero);
router.post('/', jogoController.criar);
router.put('/:id', jogoController.atualizar);
router.delete('/:id', jogoController.deletar);

module.exports = router;
