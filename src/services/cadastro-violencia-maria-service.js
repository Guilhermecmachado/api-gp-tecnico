
const db = require('../../db');


module.exports = {
    inserir: (dados) => {
        return new Promise((accept, reject) => {
            const colunas = Object.keys(dados).join(', ');
            const placeholders = Object.keys(dados).map(() => '?').join(', ');
            const valores = Object.values(dados);
    
            const sql = `INSERT INTO gta_cadastro_violencia_maria (${colunas}) VALUES (${placeholders})`;
    
            db.query(sql, valores, (error, results) => {
                if (error) { reject(error); return; }
                accept(results.insertId);
            });
        });
    },

    buscarTodos: () => {
        return new Promise((aceito, rejeitado) => {
            db.query('select * from gta_cadastro_violencia_maria', (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    },
    atualizar: (id, dados) => {
        return new Promise((aceito, rejeitado) => {
            // Construir dinamicamente os campos e placeholders
            const campos = Object.keys(dados).map((campo) => `${campo}=?`).join(', ');
            const valores = [...Object.values(dados), id]; // Adicionar o ID ao final para a cláusula WHERE
    
            const sql = `UPDATE gta_cadastro_violencia_maria SET ${campos} WHERE id = ?`;
    
            db.query(sql, valores, (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    },
    
    buscarUm: (id, numero_cadastro) => {
        return new Promise((aceito, rejeitado) => {

            db.query('SELECT * FROM gta_cadastro_violencia_maria  WHERE projeto_id = ? AND numero_cadastro =?', [id, numero_cadastro], (error, results) => {
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