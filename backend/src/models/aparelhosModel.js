const connection = require('../database/connection');

const MAX_FOTOS = 6;

const normalizeFotos = (fotos) => {
    if (!Array.isArray(fotos)) return [];

    return fotos
        .filter(f => typeof f === 'string' && f.trim() !== '')
        .slice(0, MAX_FOTOS);
};

const safeParseFotos = (fotos) => {
    if (!fotos) return [];

    if (Array.isArray(fotos)) return fotos;

    try {
        const parsed = JSON.parse(fotos);
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
};

const getAllAp = async (idCli) => {
    const [rows] = await connection.execute('SELECT * FROM aparelhos WHERE idCli = ?', [idCli]);

    return rows.map(ap => ({
        ...ap,
        fotos: safeParseFotos(ap.fotos)
    }));;
};

const getAparelho = async (idAp) => {
    const [rows] = await connection.execute('SELECT * FROM aparelhos WHERE id=?', [idAp]);

    if (!rows.length) return null;

    return {
        ...rows[0],
        fotos: safeParseFotos(rows[0].fotos)
    };
};

const addAparelho = async (idCli, dataAp) => {
    let { modelo, descricao, valor, pago, situacao, observacao, fotos } = dataAp;

    const normalizedFotos = normalizeFotos(fotos);

    const query = 'INSERT INTO aparelhos(idCli, modelo, descricao, valor, pago, situacao, observacao, fotos) VALUES(?, ?, ?, ?, ?, ?, ?, ?)';

    const [result] = await connection.execute(query, [idCli, modelo, descricao, valor, pago, situacao, observacao, JSON.stringify(normalizedFotos)]);
    
    return result;
};

const delAparelho = async (id) => {
    const [result] = await connection.execute('DELETE FROM aparelhos WHERE id=?', [id]);

    return result;
};

const updtAparelho = async (id, dataAp) => {
    let { modelo, descricao, valor, pago, situacao, observacao, fotos } = dataAp;

    const normalizedFotos = normalizeFotos(fotos);

    const query = 'UPDATE aparelhos SET modelo=?, descricao=?, valor=?, pago=?, situacao=?, observacao=?, fotos=? WHERE id=?';

    const [result] = await connection.execute(query, [ modelo, descricao, valor, pago, situacao, observacao, JSON.stringify(normalizedFotos), id]);

    return result;
};

module.exports = {
    getAllAp,
    getAparelho,
    addAparelho,
    delAparelho,
    updtAparelho
};
