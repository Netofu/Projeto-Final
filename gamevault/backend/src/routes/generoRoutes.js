const express = require('express');
const router = express.Router();
const generoController = require('../controllers/generoController');

router.get('/', generoController.listar);
router.get('/:id', generoController.buscarPorId);
router.post('/', generoController.criar);
router.put('/:id', generoController.atualizar);
router.delete('/:id', generoController.deletar);

module.exports = router;
