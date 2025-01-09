
const db = require('../../db');


module.exports = {
    inserir: (projeto_codigo, projeto_nome, usuario_id, projeto_id) => {
        return new Promise((accept, reject) => {

            db.query('INSERT INTO gta_projetos_usuarios (projeto_codigo, projeto_nome, usuario_id, projeto_id) VALUES (?,?,?,?)',
                [projeto_codigo, projeto_nome, usuario_id, projeto_id],
                (error, results) => {
                    if (error) { reject(error); return; }
                    accept(results.insertId); //insertId
                }
            );
        });
    },

    buscarTodos: (usuario_id) => {
        return new Promise((aceito, rejeitado) => {
            db.query('SELECT * FROM gta_projetos_usuarios where usuario_id=?',[usuario_id], (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    },
    atualizar: (id, projeto_codigo, projeto_nome, usuario_id, projeto_id) => {
        return new Promise((aceito, rejeitado) => {
            db.query('UPDATE gta_projetos_usuarios SET projeto_codigo=?, projeto_nome=?, usuario_id=?, projeto_id=? WHERE id = ?',
                [projeto_codigo, projeto_nome, usuario_id, projeto_id, id],
                (error, results) => {
                    if (error) { rejeitado(error); return; }
                    aceito(results);
                }
            );
        });
    },

    buscarUm: (id, projeto_id) => {
        return new Promise((aceito, rejeitado) => {

            db.query('SELECT * FROM gta_projetos_usuarios WHERE usuario_id = ? AND projeto_id =?', [id, projeto_id], (error, results) => {
                if (error) { rejeitado(error); return; }
                if (results.length > 0) {
                    aceito(results[0]);
                } else {
                    aceito(false);
                }
            });
        });
    },

    delete: (id) => {
        return new Promise((aceito, rejeitado) => {
            db.query('DELETE FROM gta_projetos_usuarios WHERE id=?',
                [id],
                (error, results) => {
                    if (error) { rejeitado(error); return; }
                    aceito(results);
                }
            );
        });
    },

}