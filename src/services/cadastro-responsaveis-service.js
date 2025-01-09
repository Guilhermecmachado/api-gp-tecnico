
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
    inserir: (campos) => {
        return new Promise((aceito, rejeitado) => {
            // Montar dinamicamente as colunas e os valores para o INSERT

            campos.valor_renda_bruta  = formatarValor(campos.valor_renda_bruta);
            campos.valor_renda_declarada_liquida  = formatarValor(campos.valor_renda_declarada_liquida);
            campos.valor_renda_liquida = formatarValor(campos.valor_renda_liquida);

            const colunas = Object.keys(campos).join(', ');
            const placeholders = Object.keys(campos).map(() => '?').join(', ');
            const valores = Object.values(campos);
    
            const sql = `INSERT INTO gta_cadastro_responsaveis (${colunas}) VALUES (${placeholders})`;
    
            db.query(sql, valores, (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results.insertId);
            });
        });
    },
    

    inserirImport: (projeto_id, projeto_nome, nome_completo, tipo_cadastro, nis, numero_cadastro, data_criacao, data_alteracao) => {
        return new Promise((accept, reject) => {

            //se for resp - cria cadastro
            if (tipo_cadastro == 'primeiroResponsavel') {
                db.query('INSERT INTO gta_cadastros (cadastrador_id, cadastrador_nome, data_criacao, numero_cadastro, primeiro_responsavel, projeto_codigo, projeto_id, projeto_nome, status) VALUES (?,?,?,?,?,?,?,?,?)',
                    [2, 'GTA IMPORTAÇÃO', data_criacao, numero_cadastro, nome_completo, 'CPGB', projeto_id, projeto_nome, true],
                    (error, results) => {
                        if (error) { reject(error); return; }
                        accept(results.insertId); //insertId
                    }
                );
            }

            db.query('INSERT INTO gta_cadastro_responsaveis (projeto_id, projeto_nome, nome_completo, tipo_cadastro, nis, numero_cadastro, data_criacao, data_alteracao) values (?,?,?,?,?,?,?,?)',
                [projeto_id, projeto_nome, nome_completo, tipo_cadastro, nis, numero_cadastro, data_criacao, data_alteracao],
                (error, results) => {
                    if (error) { reject(error); return; }
                    accept(results.insertId); //insertId
                }
            );
        });
    },

    buscarTodos: () => {
        return new Promise((aceito, rejeitado) => {
            db.query('select * from gta_cadastro_responsaveis', (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    },
    
    atualizar: (id, campos) => {
        return new Promise((aceito, rejeitado) => {


            campos.valor_renda_bruta  = formatarValor(campos.valor_renda_bruta);
            campos.valor_renda_declarada_liquida  = formatarValor(campos.valor_renda_declarada_liquida);
            campos.valor_renda_liquida = formatarValor(campos.valor_renda_liquida);
           
            // Montar dinamicamente as colunas e os valores para o UPDATE
            const colunas = Object.keys(campos).map(coluna => `${coluna} = ?`).join(', ');
            const valores = Object.values(campos);
    
            // Adicionar o ID ao final da lista de valores
            valores.push(id);
    
            const sql = `UPDATE gta_cadastro_responsaveis SET ${colunas} WHERE id = ?`;
    
            db.query(sql, valores, (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    },
    
    buscarUm: (id, numero_cadastro, tipo_cadastro) => {
        return new Promise((aceito, rejeitado) => {

            db.query('SELECT * FROM gta_cadastro_responsaveis WHERE projeto_id = ? AND numero_cadastro = ? AND tipo_cadastro  = ?', [id, numero_cadastro, tipo_cadastro], (error, results) => {
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