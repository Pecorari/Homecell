const validateBody = (req, res, next) => {
    const { body } = req;

    if (body.nome == undefined || body.nome == '') {
        return res.status(400).json({ message: 'O campo nome é obrigatório' });
    }
    if (body.cpf == undefined || body.cpf == '') {
        return res.status(400).json({ message: 'O campo cpf é obrigatório' });
    }
    if (body.numeroCell == undefined || body.numeroCell == '') {
        return res.status(400).json({ message: 'O campo numero de contato é obrigatório' });
    }
    if (body.endereco == undefined || body.endereco == '') {
        return res.status(400).json({ message: 'O campo endereço é obrigatório' });
    }
    if (body.cidade == undefined || body.cidade == '') {
        return res.status(400).json({ message: 'O campo ciadade é obrigatório' });
    }

    next();
};

module.exports = {
    validateBody
};
