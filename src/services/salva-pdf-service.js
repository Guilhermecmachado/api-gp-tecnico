
const db = require('../../db');


module.exports = {
    inserir: (link_amazon,numero_cadastro,nome_completo,nome_arquivo,data_criacao) => {
        return new Promise((accept, reject) => {

            db.query('INSERT INTO gta_dados_pdf (link_amazon, numero_cadastro, primeiro_responsavel, nome_arquivo, data_criacao) VALUES (?,?,?,?,?)',
                [link_amazon,numero_cadastro,nome_completo,nome_arquivo,data_criacao],
                (error, results) => {
                    if (error) { reject(error); return; }
                    accept(results.insertId); //insertId
                }
            );
        });
    },

    buscarTodos: () => {
        return new Promise((aceito, rejeitado) => {
            db.query('select * from gta_projetos', (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    },

    buscarTodosUsuario: (id) => {
        return new Promise((aceito, rejeitado) => {
            db.query('select * from gta_projetos_usuarios where usuario_id=?',[id], (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    },
    atualizar: (id, entidade_nome, nome_projeto, codigo, programa_nome, status) => {
        return new Promise((aceito, rejeitado) => {
            db.query('UPDATE gta_projetos SET entidade_nome = ?, nome_projeto = ?, codigo = ? ,programa_nome = ?,  status = ? WHERE id = ?',
                [entidade_nome, nome_projeto, codigo, programa_nome, status, id],
                (error, results) => {
                    if (error) { rejeitado(error); return; }
                    aceito(results);
                }
            );
        });
    },

    deletar: (id) => {
        return new Promise((resolve, reject) => {
            db.query('UPDATE gta_projetos SET status = "INATIVO" WHERE id = ?', [id], (error, results) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(results);
            });
        });
    },
    buscarUm: (id) => {
        return new Promise((aceito, rejeitado) => {

            db.query('SELECT * FROM gta_projetos WHERE id = ?', [id], (error, results) => {
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