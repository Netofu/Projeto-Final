const express = require('express');
const router = express.Router();
const franquiaController = require('../controllers/franquiaController');

router.get('/', franquiaController.listar);
router.get('/:id', franquiaController.buscarPorId);
router.post('/', franquiaController.criar);
router.put('/:id', franquiaController.atualizar);
router.delete('/:id', franquiaController.deletar);

module.exports = router;
