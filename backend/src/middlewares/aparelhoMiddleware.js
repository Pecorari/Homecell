const validateBody = (req, res, next) => {
    const { body } = req;

    if (body.modelo == undefined || body.modelo == '') {
        return res.status(400).json({ message: 'Modelo é obrigatório' });
    }
    if (body.descricao == undefined || body.descricao == '') {
        return res.status(400).json({ message: 'Descrição é obrigatório' });
    }
    if (body.valor == undefined || body.valor == '') {
        return res.status(400).json({ message: 'Valor é obrigatório' });
    }
    if (body.descricao.length > 100 ) {
        return res.status(400).json({ message: 'Descrição muito longa!' });
    }

    next();
};

module.exports = {
    validateBody
};
