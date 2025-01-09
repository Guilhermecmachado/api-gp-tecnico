
const db = require('../../db');


module.exports = {
    atualizar: (id, dados) => {
        return new Promise((aceito, rejeitado) => {
            const campos = Object.keys(dados).map((campo) => `${campo}=?`).join(', ');
            const valores = [...Object.values(dados), id];
    
            const sql = `UPDATE gta_cadastro_documento SET ${campos} WHERE id = ?`;
    
            db.query(sql, valores, (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    },

    buscarTodos: () => {
        return new Promise((aceito, rejeitado) => {
            db.query('select * from gta_cadastro_documento ', (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    },
    inserir: (dados) => {
        return new Promise((accept, reject) => {
            const colunas = Object.keys(dados).join(', ');
            const placeholders = Object.keys(dados).map(() => '?').join(', ');
            const valores = Object.values(dados);
    
            const sql = `INSERT INTO gta_cadastro_documento (${colunas}) VALUES (${placeholders})`;
    
            db.query(sql, valores, (error, results) => {
                if (error) { reject(error); return; }
                accept(results.insertId);
            });
        });
    },
    buscarUm: (id, numero_cadastro) => {
        return new Promise((aceito, rejeitado) => {

            db.query('SELECT * FROM gta_cadastro_documento  WHERE projeto_id = ? AND numero_cadastro =?', [id, numero_cadastro], (error, results) => {
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