const clientesModel = require('../models/clientesModel');

const replacer = (key, value) => typeof value === 'bigint' ? value.toString() : value;
function formatedId(value) {
    const formatedId = value.replaceAll("\"", "");
    return formatedId;
}

const getAll = async (req, res) => {
    const clientes = await clientesModel.getAll();

    return res.status(200).json(clientes);
};

const getCliente = async (req, res) => {
    const { id } = req.params;
    
    const cliente = await clientesModel.getCliente(id);

    return res.status(200).json(cliente);
};

const addCliente = async (req, res) => {
    const createdCliente = await clientesModel.addCliente(req.body);

    const stringified = JSON.stringify(createdCliente.insertId, replacer);
    const id = formatedId(stringified);
  
    return res.status(201).json(id);
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
    getCliente,
    addCliente,
    delCliente,
    updtCliente
};
