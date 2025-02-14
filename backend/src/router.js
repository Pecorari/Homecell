const express = require('express');
const clientesController = require('./controllers/clientesController');
const aparelhosController = require('./controllers/aparelhosController');

const clienteMiddleware = require('./middlewares/clienteMiddleware');

const router = express.Router();

router.get('/clientes/:limit/:page', clientesController.getAll);
router.get('/clientes/:id', clientesController.getCliente);
router.get('/clientes-search/:value', clientesController.getSearchCliente);
router.post('/cadastrar-cliente', clienteMiddleware.validateBody, clientesController.addCliente);
router.delete('/apagar-cliente/:id', clientesController.delCliente);
router.put('/editar-cliente/:id',  clienteMiddleware.validateBody, clientesController.updtCliente);

router.get('/cliente-aparelhos/:idCli', aparelhosController.getAllAp);
router.get('/cliente-aparelhos/:idCli/:id', aparelhosController.getAparelho);
router.post('/cadastrar-aparelhos/:idCli', aparelhosController.addAparelho);
router.delete('/apagar-aparelhos/:id', aparelhosController.delAparelho);
router.put('/editar-aparelhos/:id', aparelhosController.updtAparelho);

module.exports = router;
