
const db = require('../../db');


module.exports = {
    inserir: (nome, codigo, status, grupo, id_grupo) => {
        return new Promise((accept, reject) => {

            db.query('INSERT INTO gta_dominios (nome, codigo, status, grupo, id_grupo) VALUES (?,?,?,?,?)',
                [nome, codigo, status, grupo, id_grupo],
                (error, results) => {
                    if (error) { reject(error); return; }
                    accept(results.insertId); //insertId
                }
            );
        });
    },

    buscarTodos: () => {
        return new Promise((aceito, rejeitado) => {
            db.query('select * from gta_dominios ORDER BY codigo ', (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    },
    atualizar: (id, nome, grupo, id_grupo, codigo, status) => {
        return new Promise((aceito, rejeitado) => {
            db.query('UPDATE gta_dominios SET nome = ?, grupo = ? , id_grupo = ? , codigo = ?, status = ? WHERE id = ?',
                [nome, grupo, id_grupo, codigo, status, id],
                (error, results) => {
                    if (error) { rejeitado(error); return; }
                    aceito(results);
                }
            );
        });
    },
    buscarUm: (id) => {
        return new Promise((aceito, rejeitado) => {

            db.query('SELECT * FROM gta_dominios WHERE id = ?', [id], (error, results) => {
                if (error) { rejeitado(error); return; }
                if (results.length > 0) {
                    aceito(results[0]);
                } else {
                    aceito(false);
                }
            });
        });
    },

    buscarUmCodigo: (nome) => {
        return new Promise((aceito, rejeitado) => {

            db.query('SELECT * FROM gta_grupos WHERE codigo = ?', [nome], (error, results) => {
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