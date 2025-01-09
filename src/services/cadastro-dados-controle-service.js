
const db = require('../../db');


module.exports = {
    inserir: (campos) => {
        return new Promise((aceito, rejeitado) => {
            // Extrair chaves (colunas) e valores
            const colunas = Object.keys(campos).join(', ');
            const placeholders = Object.keys(campos).map(() => '?').join(', ');
            const valores = Object.values(campos);
    
            const sql = `INSERT INTO gta_cadastros_dados_controle (${colunas}) VALUES (${placeholders})`;
    
            db.query(sql, valores, (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results.insertId);
            });
        });
    },
    

    buscarTodos: () => {
        return new Promise((aceito, rejeitado) => {
            db.query('select * from gta_cadastros_dados_controle ', (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    },
    atualizar: (id, campos) => {
        return new Promise((aceito, rejeitado) => {
            // Extrair chaves (colunas) e valores
            const colunas = Object.keys(campos).map(coluna => `${coluna} = ?`).join(', ');
            const valores = Object.values(campos);
    
            // Adicionar ID no final dos valores
            valores.push(id);
    
            const sql = `UPDATE gta_cadastros_dados_controle SET ${colunas} WHERE id = ?`;
    
            db.query(sql, valores, (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    },
    
    
    buscarUm: (id, numero_cadastro) => {
        return new Promise((aceito, rejeitado) => {

            db.query('SELECT * FROM gta_cadastros_dados_controle WHERE projeto_id = ? AND numero_cadastro=?', [id, numero_cadastro], (error, results) => {
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