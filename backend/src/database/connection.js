const mariadb = require('mariadb');
require('dotenv').config();

const pool = mariadb.createPool({
    host: process.env.MARIADB_HOST,
    user: process.env.MARIADB_USER,
    password: process.env.MARIADB_PASSWD,
    database: process.env.MARIADB_NAME,
    port: process.env.MARIADB_PORT,
    connectionLimit: 10,
    connectTimeout: 30000,  
});

pool.getConnection((err, conn) => {
    if(err) {
        if(err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.log('Database connection lose');
        }
        if(err.code === 'ER_CON_COUNT_ERROR') {
            console.log('Database has too many connections');
        }
        if(err.code === 'ECONNREFUSED') {
            console.log('Database connection was refused');
        }
    }
    if(conn) {
        conn.release();
    }

    return;
});

module.exports = pool;
