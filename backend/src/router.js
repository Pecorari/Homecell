const express = require('express');
const clientesController = require('./controllers/clientesController');
const addClienteMiddleware = require('./middlewares/addClienteMiddleware');

const router = express.Router();

router.get('/clientes', clientesController.getAll);
router.post('/cadastrar-cliente', addClienteMiddleware.validateBody, clientesController.addCliente);
router.delete('/apagar-cliente/:id', clientesController.delCliente);
router.put('/editar-cliente/:id',  addClienteMiddleware.validateBody, clientesController.updtCliente);

module.exports = router;
