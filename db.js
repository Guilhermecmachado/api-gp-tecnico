const mysql = require('mysql');
require('dotenv/config')

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_SENHA,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
});

connection.connect((error) => {
    if (error) throw error;
    console.log(`Conectado ao BD: ${process.env.DB_NAME}`)
});

module.exports = connection;