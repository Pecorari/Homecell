const connection = require('../database/connection');

const getAll = async () => {
    const clientes = await connection.execute('SELECT * FROM clientes');
    return clientes;
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
    addCliente,
    delCliente,
    updtCliente
};
