
const db = require('../../db');
const { deletar } = require('./usuarios-service');


module.exports = {
    inserir: (programa_nome, status) => {
        return new Promise((accept, reject) => {

            db.query('INSERT INTO gta_programa (programa_nome, status) VALUES (?,?)',
                [programa_nome, status],
                (error, results) => {
                    if (error) { reject(error); return; }
                    accept(results.insertId); //insertId
                }
            );
        });
    },

    buscarTodos: () => {
        return new Promise((aceito, rejeitado) => {
            db.query('select * from gta_programa', (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    },
    atualizar: (id, programa_nome, status) => {
        return new Promise((aceito, rejeitado) => {
            db.query('UPDATE gta_programa SET programa_nome = ?, status = ? WHERE id = ?',
                [programa_nome, status, id],
                (error, results) => {
                    if (error) { rejeitado(error); return; }
                    aceito(results);
                }
            );
        });
    },

    deletar: (id) => {
        return new Promise((resolve, reject) => {
            db.query('UPDATE gta_programa SET status = "INATIVO" WHERE id = ?', [id], (error, results) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(results);
            });
        });
    },
    buscarUm: (id) => {
        return new Promise((aceito, rejeitado) => {

            db.query('SELECT * FROM gta_programa WHERE id = ?', [id], (error, results) => {
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