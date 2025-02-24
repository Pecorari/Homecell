const validateBody = (req, res, next) => {
    const { body } = req;

    if (body.nome == undefined || body.nome == '') {
        return res.status(400).json({ message: 'Nome é obrigatório' });
    }
    if (body.cpf == undefined || body.cpf == '') {
        return res.status(400).json({ message: 'CPF é obrigatório' });
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
    validateBody,
    validateSearch
};
