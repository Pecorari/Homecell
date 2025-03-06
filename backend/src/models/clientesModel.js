const connection = require('../database/connection');

const getAll = async (limit, page) => {
    const [clientes] = await connection.execute(
        'SELECT c.*, COUNT(a.id) AS total_aparelhos FROM clientes c LEFT JOIN aparelhos a ON c.id = a.idCli GROUP BY c.id ORDER BY c.id DESC LIMIT ? OFFSET ?',
        [Number(limit), Number(page)]);
    return clientes;
};

const getCliente = async (idCli) => {
    const [cliente] = await connection.execute('SELECT * FROM clientes WHERE id=?', [idCli]);
    return cliente;
};

const getSearchCliente = async (value) => {
    const [clienteSearched] = await connection.execute(
        'SELECT c.*, COUNT(a.id) AS total_aparelhos FROM clientes c LEFT JOIN aparelhos a ON c.id = a.idCli WHERE LOWER(TRIM(c.nome)) LIKE ? OR c.cpf = ? OR c.id = ? GROUP BY c.id ',
        [`%${value.toLowerCase().trim()}%`, value, value]);

    return clienteSearched;
};

const addCliente = async (dataCli) => {
    const { nome, cpf, numeroCell, numeroRes, endereco, cidade } = dataCli;

    const query = 'INSERT INTO clientes(nome, cpf, numeroCell, numeroRes, endereco, cidade) VALUES(?, ?, ?, ?, ?, ?)';

    const [createdCliente] = await connection.execute(query, [nome, cpf, numeroCell, numeroRes, endereco, cidade]);

    return createdCliente;
};

const delCliente = async (idCli) => {
    const [deletedCliente] = await connection.execute('DELETE FROM clientes WHERE id=?', [idCli]);

    return deletedCliente;
};

const updtCliente = async (idCli, dataCli) => {
    const { nome, cpf, numeroCell, numeroRes, endereco, cidade } = dataCli;

    const query = 'UPDATE clientes SET nome=?, cpf=?, numeroCell=?, numeroRes=?, endereco=?, cidade=? WHERE id=?';
    const [updatedCliente] = await connection.execute(query, [nome, cpf, numeroCell, numeroRes, endereco, cidade, idCli]);

    return updatedCliente;
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
