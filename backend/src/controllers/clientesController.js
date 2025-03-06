const clientesModel = require('../models/clientesModel');

const getAll = async (req, res) => {
    try {
        const { limit, page } = req.params;
        const clientes = await clientesModel.getAll(limit, page);

        if (!Array.isArray(clientes)) {
            console.error('Erro: clientes não é um array:', clientes);
            return res.status(500).json({ error: 'Erro ao buscar clientes' });
        }

        clientes.forEach(cliente => {
            if (cliente.created_at && !isNaN(new Date(cliente.created_at))) {
                cliente.created_at = new Date(cliente.created_at).toISOString();
            } else cliente.created_at = null;
            if (cliente.updated_at && !isNaN(new Date(cliente.updated_at))) {
                cliente.updated_at = new Date(cliente.updated_at).toISOString();
            } else cliente.updated_at = null;
        });

        return res.status(200).json(clientes);
    } catch (error) {
        console.error('Erro em getAll:', error);
        return res.status(500).json({ error: 'Erro interno no servidor' });
    }
};

const getCliente = async (req, res) => {
    try {
        const { id } = req.params;
        
        const cliente = await clientesModel.getCliente(id);

        if (!cliente) {
            return res.status(404).json({ error: 'Cliente não encontrado' });
        }

        return res.status(200).json(cliente);
    } catch (error) {
        console.error('Erro em getCliente:', error);
        return res.status(500).json({ error: 'Erro interno no servidor' });
    }
};

const getSearchCliente = async (req, res) => {
    try {
        const { value } = req.query;

        const clienteSearched = await clientesModel.getSearchCliente(value);

        return res.status(200).json(clienteSearched);
    } catch (error) {
        console.error('Erro em getSearchCliente:', error);
        return res.status(500).json({ error: 'Erro interno no servidor' });
    }
};

const addCliente = async (req, res) => {
    try {
        const createdCliente = await clientesModel.addCliente(req.body);

        return res.status(201).json(createdCliente.insertId);
    } catch (error) {
        console.error('Erro em addCliente:', error);
        return res.status(500).json({ error: 'Erro ao adicionar cliente' });
    }
};

const delCliente = async (req, res) => {
    try {
        const { id } = req.params;

        await clientesModel.delCliente(id);

        return res.status(204).json();
    } catch (error) {
        console.error('Erro em delCliente:', error);
        return res.status(500).json({ error: 'Erro ao deletar cliente' });
    }
};

const updtCliente = async (req, res) => {
    try {
        const { id } = req.params;

        await clientesModel.updtCliente(id, req.body);

        return res.status(204).json();
    } catch (error) {
        console.error('Erro em updtCliente:', error);
        return res.status(500).json({ error: 'Erro ao atualizar cliente' });
    }
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
