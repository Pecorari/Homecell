const connection = require('../database/connection');

const validateNome = async (req, res, next) => {
    const { body } = req;

    if (body.nome == undefined || body.nome.trim() == '') {
        return res.status(400).json({ message: 'Nome é obrigatório' });
    }
    
    next();
};

const validateCPF = async (req, res, next) => {
    const { body } = req;
    
    const [[{ cliCadastrado }]] = await connection.execute('SELECT COUNT(*) as cliCadastrado FROM clientes WHERE cpf=?', [body.cpf]);

    if (cliCadastrado > 0) {
        return res.status(400).json({ message: 'CPF já cadastrado' });
    }
    
    next();
};

const validateSearch = (req, res, next) => {
    const { value } = req.query;

    if (value == undefined || value == '') {
        return res.status(400).json({ message: 'Campo pesquisa vazio' });
    }

    next();
};

module.exports = {
    validateNome,
    validateCPF,
    validateSearch
};
