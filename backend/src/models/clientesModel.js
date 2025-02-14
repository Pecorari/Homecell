const connection = require('../database/connection');

const getAll = async (reqParams) => {
    const {limit, page} = reqParams;

    const clientes = await connection.execute('SELECT * FROM clientes ORDER BY id DESC LIMIT ? OFFSET ?', [limit, page]);
    return clientes;
};

const getCliente = async (idCli) => {
    const cliente = await connection.execute('SELECT * FROM clientes WHERE id=?', [idCli]);
    return cliente;
};

const getSearchCliente = async (value) => {
    const clienteSearched = await connection.execute('SELECT * FROM clientes WHERE nome=? OR cpf=?', [value, value]);

    return clienteSearched;
};

const addCliente = async (dataCli) => {
    const { nome, cpf, numeroCell, numeroRes, endereco, cidade } = dataCli;

    const dateUTC = new Date(Date.now()).toUTCString();

    const query = 'INSERT INTO clientes(nome, cpf, numeroCell, numeroRes, endereco, cidade, created_at) VALUES(?, ?, ?, ?, ?, ?, ?)';

    const createdCliente = await connection.execute(query, [nome, cpf, numeroCell, numeroRes, endereco, cidade, dateUTC]);

    return createdCliente;
};

const delCliente = async (idCli) => {
    const deletedCliente = await connection.execute('DELETE FROM clientes WHERE id=?', [idCli]);

    return deletedCliente;
};

const updtCliente = async (idCli, dataCli) => {
    const { nome, cpf, numeroCell, numeroRes, endereco, cidade } = dataCli;
    const dateUTC = new Date(Date.now()).toUTCString();

    const query = 'UPDATE clientes SET nome=?, cpf=?, numeroCell=?, numeroRes=?, endereco=?, cidade=?, created_at=? WHERE id=?';
    const updatedCliente = await connection.execute(query, [nome, cpf, numeroCell, numeroRes, endereco, cidade, dateUTC, idCli]);

    return updatedCliente;
};

module.exports = {
    getAll,
    getCliente,
    getSearchCliente,
    addCliente,
    delCliente,
    updtCliente
};
