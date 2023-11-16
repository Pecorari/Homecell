const clientesModel = require('../models/clientesModel');

const getAll = async (req, res) => {
    const clientes = await clientesModel.getAll();

    return res.status(200).json(clientes);
};

const addCliente = async (req, res) => {
    const createdCliente = await clientesModel.addCliente(req.body);
    console.log({ insertId: createdCliente.insertId });
    
    return res.status(201).json({ message: 'created' });
};

const delCliente = async (req, res) => {
    const { id } = req.params;
    await clientesModel.delCliente(id);

    return res.status(204).json();
};

const updtCliente = async (req, res) => {
    const { id } = req.params;

    await clientesModel.updtCliente(id, req.body);

    return res.status(204).json();
};

module.exports = {
    getAll,
    addCliente,
    delCliente,
    updtCliente
};
