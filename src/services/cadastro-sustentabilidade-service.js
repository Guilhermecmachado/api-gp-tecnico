
const db = require('../../db');


module.exports = {
    inserir: (dados) => {
        return new Promise((accept, reject) => {
            // Obter colunas e placeholders dinamicamente
            const colunas = Object.keys(dados).join(', ');
            const placeholders = Object.keys(dados).map(() => '?').join(', ');
            const valores = Object.values(dados);
    
            const sql = `INSERT INTO gta_cadastro_sustentabilidade (${colunas}) VALUES (${placeholders})`;
    
            db.query(sql, valores, (error, results) => {
                if (error) { reject(error); return; }
                accept(results.insertId); // Retorna o ID do registro inserido
            });
        });
    },
    

    buscarTodos: () => {
        return new Promise((aceito, rejeitado) => {
            db.query('select * from gta_cadastro_sustentabilidade ', (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    },
    atualizar: (id, campos) => {
        return new Promise((aceito, rejeitado) => {
            // Construção dinâmica das colunas para o UPDATE
            const colunas = Object.keys(campos).map(coluna => `${coluna} = ?`).join(', ');
            const valores = Object.values(campos);
    
            // Adiciona o ID ao final da lista de valores
            valores.push(id);
    
            const sql = `UPDATE gta_cadastro_sustentabilidade SET ${colunas} WHERE id = ?`;
    
            db.query(sql, valores, (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    },
    
    buscarUm: (id, numero_cadastro) => {
        return new Promise((aceito, rejeitado) => {

            db.query('SELECT * FROM gta_cadastro_sustentabilidade  WHERE projeto_id = ? AND numero_cadastro =?', [id, numero_cadastro], (error, results) => {
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