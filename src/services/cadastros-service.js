
const db = require('../../db');
//CADASTRO ESTÁ OK

module.exports = {

    criaCadadastroInicial(id) {

    },

    inserir: (cadastro_id, cadastro_nome, data_criacao, numero_cadastro, primeiro_responsavel, projeto_codigo, projeto_id, projeto_nome, status, status_online) => {
        return new Promise((accept, reject) => {

            db.query('INSERT INTO gta_cadastros (cadastrador_id, cadastrador_nome, data_criacao, numero_cadastro, primeiro_responsavel, projeto_codigo, projeto_id, projeto_nome, status,status_online) VALUES (?,?,?,?,?,?,?,?,?,?)',
                [cadastro_id, cadastro_nome, data_criacao, numero_cadastro, primeiro_responsavel, projeto_codigo, projeto_id, projeto_nome, status, status_online],
                (error, results) => {
                    if (error) { reject(error); return; }
                    accept(results.insertId); //insertId
                }
            );
        });
    },

    buscarTodos: () => {
        return new Promise((aceito, rejeitado) => {



            db.query('select * from gta_cadastros', (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    },
    atualizar: (id, cadastro_id, cadastro_nome, data_alteracao, numero_cadastro, primeiro_responsavel, projeto_codigo, projeto_id, projeto_nome, status, status_online) => {
        return new Promise((aceito, rejeitado) => {
            db.query('UPDATE gta_cadastros SET cadastrador_id=?, cadastrador_nome=?, data_alteracao=?, numero_cadastro=?, primeiro_responsavel=?, projeto_codigo=?, projeto_id=?, projeto_nome=?, status=?,status_online=? WHERE id = ?',
                [cadastro_id, cadastro_nome, data_alteracao, numero_cadastro, primeiro_responsavel, projeto_codigo, projeto_id, projeto_nome, status, status_online, id],
                (error, results) => {
                    if (error) { rejeitado(error); return; }
                    aceito(results);
                }
            );
        });
    },

    deletar: (id) => {
        return new Promise((resolve, reject) => {
            db.query('UPDATE gta_cadastros SET status_db = "INATIVO" WHERE id = ?', [id], (error, results) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(results);
            });
        });
    },

    atualizarResponsavel: (id, primeiro_responsavel, cpf) => {
        return new Promise((aceito, rejeitado) => {
            db.query('UPDATE gta_cadastros SET  primeiro_responsavel=?,cpf=? WHERE id = ?',
                [primeiro_responsavel, cpf, id],
                (error, results) => {
                    if (error) { rejeitado(error); return; }
                    aceito(results);
                }
            );
        });
    },

    buscarUm: (id) => {
        return new Promise((aceito, rejeitado) => {

            db.query('SELECT * FROM gta_cadastros WHERE projeto_id = ?', [id], (error, results) => {
                if (error) { rejeitado(error); return; }
                if (results.length > 0) {
                    aceito(results);
                } else {
                    aceito(false);
                }
            });
        });
    },

    buscarUmApp: (numero_cadastro) => {
        return new Promise((aceito, rejeitado) => {

            db.query('SELECT * FROM gta_cadastros WHERE numero_cadastro = ?', [numero_cadastro], (error, results) => {
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

            db.query('SELECT * FROM gta_cadastros WHERE id = ?', [id], (error, results) => {
                if (error) { rejeitado(error); return; }
                if (results.length > 0) {
                    aceito(results[0]);
                } else {
                    aceito(false);
                }
            });
        });
    },

    buscarUmCadastro: (id, numero_cadastro) => {
        return new Promise((aceito, rejeitado) => {

            db.query('SELECT * FROM gta_cadastros WHERE projeto_id = ? AND numero_cadastro=?', [id, numero_cadastro], (error, results) => {
                if (error) { rejeitado(error); return; }
                if (results.length > 0) {
                    aceito(results);
                } else {
                    aceito(false);
                }
            });
        });
    },

    buscarCadastros: (nome_tabela, numero_cadastro) => {
        return new Promise((aceito, rejeitado) => {

            db.query('SELECT * FROM ' + nome_tabela + ' WHERE  numero_cadastro=?', [numero_cadastro], (error, results) => {
                if (error) { rejeitado(error); return; }
                if (results.length > 0) {
                    aceito(results);
                } else {
                    aceito(false);
                }
            });
        });
    },


    buscarCadastrosCadastrador: (nome_tabela, numero_cadastro) => {
        return new Promise((aceito, rejeitado) => {

            db.query('SELECT * FROM ' + nome_tabela + ' WHERE  numero_cadastro=?', [numero_cadastro], (error, results) => {
                if (error) { rejeitado(error); return; }
                if (results.length > 0) {
                    aceito(results);
                } else {
                    aceito(false);
                }
            });
        });
    },

    buscarCadastrosResponsavel: (nome_tabela, numero_cadastro, tipo_cadastro) => {
        return new Promise((aceito, rejeitado) => {

            db.query('SELECT * FROM ' + nome_tabela + ' WHERE  numero_cadastro=? AND tipo_cadastro=?', [numero_cadastro, tipo_cadastro], (error, results) => {
                if (error) { rejeitado(error); return; }
                if (results.length > 0) {
                    aceito(results);
                } else {
                    aceito(false);
                }
            });
        });
    },

    atualizarTabelas: (id, nome_tabela, cadastrador_id, status_online) => {
        return new Promise((aceito, rejeitado) => {
            db.query('UPDATE ' + nome_tabela + 'SET cadastrador_id=?, status_online=? WHERE id = ?',
                [cadastrador_id, status_online, id],
                (error, results) => {
                    if (error) { rejeitado(error); return; }
                    aceito(results);
                }
            );
        });
    },


}