const express = require('express');
const clientesController = require('./controllers/clientesController');
const aparelhosController = require('./controllers/aparelhosController');

const clienteMiddleware = require('./middlewares/clienteMiddleware');
const aparelhoMiddleware = require('./middlewares/aparelhoMiddleware');

const router = express.Router();

router.get('/clientes/:limit/:page', clientesController.getAll);
router.get('/clientes/:id', clientesController.getCliente);
router.get('/clientes-search', clienteMiddleware.validateSearch, clientesController.getSearchCliente);
router.post('/cadastrar-cliente', clienteMiddleware.validateBody, clientesController.addCliente);
router.delete('/apagar-cliente/:id', clientesController.delCliente);
router.put('/editar-cliente/:id',  clienteMiddleware.validateBody, clientesController.updtCliente);

router.get('/cliente-aparelhos/:idCli', aparelhosController.getAllAp);
router.get('/cliente-aparelhos/:idCli/:id', aparelhosController.getAparelho);
router.post('/cadastrar-aparelhos/:idCli', aparelhoMiddleware.validateBody, aparelhosController.addAparelho);
router.delete('/apagar-aparelhos/:id', aparelhosController.delAparelho);
router.put('/editar-aparelhos/:id', aparelhoMiddleware.validateBody, aparelhosController.updtAparelho);

// Desenvolvido por Thiago Pecorari Clemente - GitHub: https://github.com/Pecorari
module.exports = router;
