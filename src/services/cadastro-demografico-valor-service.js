
const db = require('../../db');
function formatarValor(valor) {
    if (typeof valor === 'string') {
        // Se a string estiver vazia, retorna 0
        if (valor.trim() === '') {
            return 0;
        }
        // Remove a máscara: R$, pontos de milhar e vírgula
        valor = valor.replace('R$', '').replace(/\./g, '').replace(',', '.');
        return parseFloat(valor);
    }
    return valor; // Caso já seja número, retorna sem alteração
}



module.exports = {
    inserir: (dados) => {
        return new Promise((accept, reject) => {
            // Converter campos de valor para float
            dados.despesa_agua  = formatarValor(dados.despesa_agua);
            dados.despesa_alimentacao  = formatarValor(dados.despesa_alimentacao);
            dados.despesa_aluguel  = formatarValor(dados.despesa_aluguel);
            dados.despesa_gas  = formatarValor(dados.despesa_gas);
            dados.despesa_luz = formatarValor(dados.despesa_luz);
            dados.despesa_saude = formatarValor(dados.despesa_saude);
            dados.despesa_transporte = formatarValor(dados.despesa_transporte);
            dados.valor_aluguel_social = formatarValor(dados.valor_aluguel_social);
    
            const colunas = Object.keys(dados).join(', ');
            const placeholders = Object.keys(dados).map(() => '?').join(', ');
            const valores = Object.values(dados);
    
            const sql = `INSERT INTO gta_cadastro_demografico_valores (${colunas}) VALUES (${placeholders})`;
    
            db.query(sql, valores, (error, results) => {
                if (error) { reject(error); return; }
                accept(results.insertId);
            });
        });
    },
    

    buscarTodos: () => {
        return new Promise((aceito, rejeitado) => {
            db.query('select * from gta_cadastro_demografico_valores ', (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    },
    atualizar: (id, dados) => {
        return new Promise((aceito, rejeitado) => {
            // Converter campos de valor para float
            dados.despesa_agua  = formatarValor(dados.despesa_agua);
            dados.despesa_alimentacao  = formatarValor(dados.despesa_alimentacao);
            dados.despesa_aluguel  = formatarValor(dados.despesa_aluguel);
            dados.despesa_gas  = formatarValor(dados.despesa_gas);
            dados.despesa_luz = formatarValor(dados.despesa_luz);
            dados.despesa_saude = formatarValor(dados.despesa_saude);
            dados.despesa_transporte = formatarValor(dados.despesa_transporte);
            dados.valor_aluguel_social = formatarValor(dados.valor_aluguel_social);
            
    
            const campos = Object.keys(dados).map((campo) => `${campo} = ?`).join(', ');
            const valores = [...Object.values(dados), id];
    
            const sql = `UPDATE gta_cadastro_demografico_valores SET ${campos} WHERE id = ?`;
    
            db.query(sql, valores, (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    },
    
    buscarUm: (id, numero_cadastro) => {
        return new Promise((aceito, rejeitado) => {

            db.query('SELECT * FROM gta_cadastro_demografico_valores  WHERE projeto_id = ? AND numero_cadastro =?', [id, numero_cadastro], (error, results) => {
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