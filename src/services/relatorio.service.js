
const db = require('../../db');


module.exports = {
 
    buscarUm: (id,tabela) => {
        return new Promise((aceito, rejeitado) => {

            db.query('SELECT * FROM ' + tabela + ' WHERE projeto_id = ?', [id], (error, results) => {
                if (error) { rejeitado(error); return; }
                if (results.length > 0) {
                    aceito(results);
                } else {
                    aceito(false);
                }
            });
        });
    },
}