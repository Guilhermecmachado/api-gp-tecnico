
const db = require('../../db');


module.exports = {
    inserir: (nome, codigo, status) => {
        return new Promise((accept, reject) => {

            db.query('INSERT INTO gta_grupos (nome, codigo, status) VALUES (?,?,?)',
                [nome, codigo, status],
                (error, results) => {
                    if (error) { reject(error); return; }
                    accept(results.insertId); //insertId
                }
            );
        });
    },

    buscarTodos: () => {
        return new Promise((aceito, rejeitado) => {
            db.query('select * from gta_grupos', (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    },
    atualizar: (id, nome, status, codigo) => {
        return new Promise((aceito, rejeitado) => {
            db.query('UPDATE gta_grupos SET nome = ?, status = ?,codigo = ? WHERE id = ?',
                [nome, status, codigo, id],
                (error, results) => {
                    if (error) { rejeitado(error); return; }
                    aceito(results);
                }
            );
        });
    },
    buscarUm: (id) => {
        return new Promise((aceito, rejeitado) => {

            db.query('SELECT * FROM gta_grupos WHERE id = ?', [id], (error, results) => {
                if (error) { rejeitado(error); return; }
                if (results.length > 0) {
                    aceito(results[0]);
                } else {
                    aceito(false);
                }
            });
        });
    },
}