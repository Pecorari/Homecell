const connection = require('../database/connection');

const getAllAp = async (idCli) => {
    const aparelhos = await connection.execute('SELECT * FROM aparelhos WHERE idCli = ?', [idCli]);

    return aparelhos;
};

const getAparelho = async (idAp) => {
    const aparelho = await connection.execute('SELECT * FROM aparelhos WHERE id=?', [idAp]);

    return aparelho;
};

const addAparelho = async (idCli, dataAp) => {
    const { modelo, descricao, valor, pago, situacao } = dataAp;

    const dateUTC = new Date(Date.now()).toUTCString();

    const query = 'INSERT INTO aparelhos(idCli, modelo, descricao, valor, pago, situacao, created_at) VALUES(?, ?, ?, ?, ?, ?, ?)';

    const createdAparelho = connection.execute(query, [idCli, modelo, descricao, valor, pago, situacao, dateUTC]);
    
    return createdAparelho;
};

const delAparelho = async (id) => {
    const deletedAparelho = await connection.execute('DELETE FROM aparelhos WHERE id=?', [id]);

    return deletedAparelho;
};

const updtAparelho = async (id, dataAp) => {
    const { modelo, descricao, valor, pago, situacao } = dataAp;
    const dateUTC = new Date(Date.now()).toUTCString();

    const query = 'UPDATE aparelhos SET modelo=?, descricao=?, valor=?, pago=?, situacao=?, created_at=? WHERE id=?';
    const updatedAparelho = await connection.execute(query, [ modelo, descricao, valor, pago, situacao, dateUTC, id]);

    return updatedAparelho;
};

module.exports = {
    getAllAp,
    getAparelho,
    addAparelho,
    delAparelho,
    updtAparelho
};
