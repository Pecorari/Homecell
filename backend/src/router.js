const express = require('express');
const loginController = require('./controllers/loginController');
const clientesController = require('./controllers/clientesController');
const aparelhosController = require('./controllers/aparelhosController');

const loginMiddleware = require('./middlewares/loginMiddleware');
const clienteMiddleware = require('./middlewares/clienteMiddleware');
const aparelhoMiddleware = require('./middlewares/aparelhoMiddleware');

const router = express.Router();

router.post('/login', loginController.login);

router.get('/clientes/:limit/:page', loginMiddleware.verifyToken, clientesController.getAll);
router.get('/clientes/:id', loginMiddleware.verifyToken, clientesController.getCliente);
router.get('/clientes-search', loginMiddleware.verifyToken, clienteMiddleware.validateSearch, clientesController.getSearchCliente);
router.post('/cadastrar-cliente', loginMiddleware.verifyToken, clienteMiddleware.validateBody, clientesController.addCliente);
router.delete('/apagar-cliente/:id', loginMiddleware.verifyToken, clientesController.delCliente);
router.put('/editar-cliente/:id',  loginMiddleware.verifyToken, clienteMiddleware.validateBody, clientesController.updtCliente);

router.get('/cliente-aparelhos/:idCli', loginMiddleware.verifyToken, aparelhosController.getAllAp);
router.get('/cliente-aparelhos/:idCli/:id', loginMiddleware.verifyToken, aparelhosController.getAparelho);
router.post('/cadastrar-aparelhos/:idCli', loginMiddleware.verifyToken, aparelhoMiddleware.validateBody, aparelhosController.addAparelho);
router.delete('/apagar-aparelhos/:id', loginMiddleware.verifyToken, aparelhosController.delAparelho);
router.put('/editar-aparelhos/:id', loginMiddleware.verifyToken, aparelhoMiddleware.validateBody, aparelhosController.updtAparelho);

// Desenvolvido por Thiago Pecorari Clemente - GitHub: https://github.com/Pecorari
module.exports = router;
