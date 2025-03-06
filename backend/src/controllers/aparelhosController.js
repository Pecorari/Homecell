const aparelhosModel = require('../models/aparelhosModel');

const getAllAp = async (req, res) => {
    const { idCli } = req.params;
    const aparelhos = await aparelhosModel.getAllAp(idCli);

    return res.status(200).json(aparelhos);
};

const getAparelho = async (req, res) => {
    const { id } = req.params;
    const aparelho = await aparelhosModel.getAparelho(id);

    return res.status(200).json(aparelho);
};

const addAparelho = async (req, res) => {
    const { idCli } = req.params;

    const createdAparelho = await aparelhosModel.addAparelho(idCli, req.body);
    console.log({ insertId: createdAparelho.insertId });
    
    return res.status(201).json({ message: 'created' });
};

const delAparelho = async (req, res) => {
    const { id } = req.params;

    await aparelhosModel.delAparelho(id);

    return res.status(204).json();
};

const updtAparelho = async (req, res) => {
    const { id } = req.params;

    await aparelhosModel.updtAparelho(id, req.body);

    return res.status(204).json();
};

module.exports = {
    getAllAp,
    getAparelho,
    addAparelho,
    delAparelho,
    updtAparelho
};
