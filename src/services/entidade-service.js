
const db = require('../../db');


module.exports = {
    inserir: (entidade_nome, status) => {
        return new Promise((accept, reject) => {

            db.query('INSERT INTO gta_entidades (entidade_nome, status) VALUES (?,?)',
                [entidade_nome, status],
                (error, results) => {
                    if (error) { reject(error); return; }
                    accept(results.insertId); //insertId
                }
            );
        });
    },

    buscarTodos: () => {
        return new Promise((aceito, rejeitado) => {
            db.query('select * from gta_entidades', (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    },
    atualizar: (id, entidade_nome, status) => {
        return new Promise((aceito, rejeitado) => {
            db.query('UPDATE gta_entidades SET entidade_nome = ?, status = ? WHERE id = ?',
                [entidade_nome, status, id],
                (error, results) => {
                    if (error) { rejeitado(error); return; }
                    aceito(results);
                }
            );
        });
    },

    deletar: (id) => {
        return new Promise((resolve, reject) => {
            db.query('UPDATE gta_entidades SET status = "INATIVO" WHERE id = ?', [id], (error, results) => {
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

            db.query('SELECT * FROM gta_entidades WHERE id = ?', [id], (error, results) => {
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