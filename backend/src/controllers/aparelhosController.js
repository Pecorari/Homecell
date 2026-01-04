const aparelhosModel = require('../models/aparelhosModel');
const { deletarFotosFirebase } = require('./firebaseController');

const getAllAp = async (req, res) => {
    try {
        const { idCli } = req.params;
        const aparelhos = await aparelhosModel.getAllAp(idCli);

        return res.status(200).json(aparelhos);
    } catch (err) {
        return res.status(500).json({ message: 'Erro ao buscar aparelhos' });
    }
};

const getAparelho = async (req, res) => {
    try {
        const { id } = req.params;
        const aparelho = await aparelhosModel.getAparelho(id);

        if (!aparelho) {
            return res.status(404).json({ message: 'Aparelho não encontrado' });
        }

        return res.status(200).json(aparelho);
    } catch {
        return res.status(500).json({ message: 'Erro ao buscar aparelho' });
    }
};

const addAparelho = async (req, res) => {
    try {
        const { idCli } = req.params;

        await aparelhosModel.addAparelho(idCli, req.body);
        
        return res.status(201).json({ message: 'created' });
    } catch {
        return res.status(500).json({ message: 'Erro ao criar aparelho' });
    }
};

const delAparelho = async (req, res) => {
    try {
        const { id } = req.params;

        await aparelhosModel.delAparelho(id);

        return res.status(204).end();
    } catch {
        return res.status(500).json({ message: 'Erro ao deletar aparelho' });
    }
};

const updtAparelho = async (req, res) => {
    try {
        const { id } = req.params;

        await deletarFotosFirebase(req.body.fotosRemovidas);

        await aparelhosModel.updtAparelho(id, req.body);

        return res.status(204).end();
    } catch {
        return res.status(500).json({ message: 'Erro ao atualizar aparelho' });
    }
};

module.exports = {
    getAllAp,
    getAparelho,
    addAparelho,
    delAparelho,
    updtAparelho
};
