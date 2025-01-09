
const db = require('../../db');


module.exports = {
    inserir: (motivo, motivo_outros, idade, data_criacao, data_alteracao, numero_cadastro, uuid, ano, projeto_id, projeto_nome, cadastrador_id, status_online) => {
        return new Promise((accept, reject) => {

            db.query('INSERT INTO gta_cadastro_violencia (motivo, motivo_outros, idade, data_criacao, data_alteracao, numero_cadastro, uuid, ano, projeto_id, projeto_nome,cadastrador_id,status_online) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)',
                [motivo, motivo_outros, idade, data_criacao, data_alteracao, numero_cadastro, uuid, ano, projeto_id, projeto_nome, cadastrador_id, status_online],
                (error, results) => {
                    if (error) { reject(error); return; }
                    accept(results.insertId); //insertId
                }
            );
        });
    },

    buscarTodos: () => {
        return new Promise((aceito, rejeitado) => {
            db.query('select * from gta_cadastro_violencia ', (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    },

    buscarUmUiid: (uuid) => {
        return new Promise((aceito, rejeitado) => {

            db.query('SELECT * FROM gta_cadastro_violencia  WHERE uuid = ? ', [uuid], (error, results) => {
                if (error) { rejeitado(error); return; }
                if (results.length > 0) {
                    aceito(results);
                } else {
                    aceito(false);
                }
            });
        });
    },

    atualizar: (id, motivo, motivo_outros, idade, ano, cadastrador_id, status_online, data_alteracao) => {
        return new Promise((aceito, rejeitado) => {
            db.query('UPDATE gta_cadastro_violencia SET motivo = ?,motivo_outros=?,idade=?,ano=?, cadastrador_id=?,status_online=?,data_alteracao = ? WHERE id = ?',
                [motivo, motivo_outros, idade, ano, cadastrador_id, status_online, data_alteracao, id],
                (error, results) => {
                    if (error) { rejeitado(error); return; }
                    aceito(results);
                }
            );
        });
    },

    deletar: (id) => {
        return new Promise((resolve, reject) => {
            db.query('UPDATE gta_cadastro_violencia SET status_db = "INATIVO" WHERE id = ?', [id], (error, results) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(results);
            });
        });
    },

    
    buscarUm: (id, numero_cadastro) => {
        return new Promise((aceito, rejeitado) => {

            db.query('SELECT * FROM gta_cadastro_violencia  WHERE projeto_id = ? AND numero_cadastro=?', [id, numero_cadastro], (error, results) => {
                if (error) { rejeitado(error); return; }
                if (results.length > 0) {
                    aceito(results);
                } else {
                    aceito(false);
                }
            });
        });
    },
    buscarUmForm: (id) => {
        return new Promise((aceito, rejeitado) => {

            db.query('SELECT * FROM gta_cadastro_violencia  WHERE id = ?', [id], (error, results) => {
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