const clientesModel = require('../models/clientesModel');

const replacer = (key, value) => typeof value === 'bigint' ? value.toString() : value;
function formatedId(value) {
    const formatedId = value.replaceAll("\"", "");
    return formatedId;
}

const getAll = async (req, res) => {
    const clientes = await clientesModel.getAll(req.params);

    clientes.forEach(cliente => {
        if (cliente.created_at && !isNaN(new Date(cliente.created_at))) {
            cliente.created_at = new Date(cliente.created_at).toISOString();
        } else cliente.created_at = null;
        if (cliente.updated_at && !isNaN(new Date(cliente.updated_at))) {
            cliente.updated_at = new Date(cliente.updated_at).toISOString();
        } else cliente.updated_at = null;
    });
    
    return res.status(200).json(clientes);
};

const getCliente = async (req, res) => {
    const { id } = req.params;
    
    const cliente = await clientesModel.getCliente(id);

    return res.status(200).json(cliente);
};

const getSearchCliente = async (req, res) => {
    const { value } = req.query;

    const clienteSearched = await clientesModel.getSearchCliente(value);

    return res.status(200).json(clienteSearched);
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
// Desenvolvido por Thiago Pecorari Clemente - GitHub: https://github.com/Pecorari
module.exports = {
    getAll,
    getCliente,
    getSearchCliente,
    addCliente,
    delCliente,
    updtCliente
};
