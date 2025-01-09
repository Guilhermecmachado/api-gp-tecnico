
const db = require('../../db');


module.exports = {
    inserir: (beneficios, beneficios_valor, curso_frequenta, data_alteracao, data_criacao, estado_civil, estudou_ate, frequenta_escola, genero, grupo_etnico, idade, nome_completo, outra_fonte_renda, outra_fonte_renda_valor, pne, posicao_familiar, profissao, projeto_id, projeto_nome, renda_principal, renda_principal_valor, situacao_ocupacional, uuid, numero_cadastro, cid, cancer, autismo, gestante, status_online, cadastrador_id) => {
        return new Promise((accept, reject) => {

            db.query('INSERT INTO gta_cadastro_demografico_socio_economico (beneficios, beneficios_valor, curso_frequenta, data_alteracao, data_criacao, estado_civil, estudou_ate, frequenta_escola, genero, grupo_etnico, idade, nome_completo, outra_fonte_renda, outra_fonte_renda_valor, pne, posicao_familia, profissao, projeto_id, projeto_nome, renda_principal, renda_principal_valor, situacao_ocupacional, uuid, numero_cadastro,cid,cancer, autismo, gestante,status_online,cadastrador_id) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
                [beneficios, beneficios_valor, curso_frequenta, data_alteracao, data_criacao, estado_civil, estudou_ate, frequenta_escola, genero, grupo_etnico, idade, nome_completo, outra_fonte_renda, outra_fonte_renda_valor, pne, posicao_familiar, profissao, projeto_id, projeto_nome, renda_principal, renda_principal_valor, situacao_ocupacional, uuid, numero_cadastro, cid, cancer, autismo, gestante, status_online, cadastrador_id],
                (error, results) => {
                    if (error) { reject(error); return; }
                    accept(results.insertId); //insertId
                }
            );
        });
    },

    buscarTodos: () => {
        return new Promise((aceito, rejeitado) => {
            db.query('select * from gta_cadastro_demografico_socio_economico ', (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    },
    atualizar: (id, beneficios, beneficios_valor, curso_frequenta, estado_civil, estudou_ate, frequenta_escola, genero, grupo_etnico, idade, nome_completo, outra_fonte_renda, outra_fonte_renda_valor, pne, posicao_familiar, profissao, renda_principal, renda_principal_valor, situacao_ocupacional, cid, cancer, autismo, gestante, cadastrador_id, status_online, data_alteracao) => {
        return new Promise((aceito, rejeitado) => {
            db.query('UPDATE gta_cadastro_demografico_socio_economico SET beneficios=?, beneficios_valor=?, curso_frequenta=?, estado_civil=?, estudou_ate=?, frequenta_escola=?, genero=?, grupo_etnico=?, idade=?, nome_completo=?, outra_fonte_renda=?, outra_fonte_renda_valor=?, pne=?, posicao_familia=?, profissao=?, renda_principal=?, renda_principal_valor=?, situacao_ocupacional=?,cid=?,cancer=?, autismo=?, gestante=?,cadastrador_id=?,status_online=?,data_alteracao=? WHERE id = ?',
                [beneficios, beneficios_valor, curso_frequenta, estado_civil, estudou_ate, frequenta_escola, genero, grupo_etnico, idade, nome_completo, outra_fonte_renda, outra_fonte_renda_valor, pne, posicao_familiar, profissao, renda_principal, renda_principal_valor, situacao_ocupacional, cid, cancer, autismo, gestante, cadastrador_id, status_online, data_alteracao, id],
                (error, results) => {
                    if (error) { rejeitado(error); return; }
                    aceito(results);
                }
            );
        });
    },

    deletar: (id) => {
        return new Promise((resolve, reject) => {
            db.query('UPDATE gta_cadastro_demografico_socio_economico SET status_db = "INATIVO" WHERE id = ?', [id], (error, results) => {
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

            db.query('SELECT * FROM gta_cadastro_demografico_socio_economico WHERE projeto_id = ? AND numero_cadastro =?', [id, numero_cadastro], (error, results) => {
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

            db.query('SELECT * FROM gta_cadastro_demografico_socio_economico WHERE id = ? ', [id], (error, results) => {
                if (error) { rejeitado(error); return; }
                if (results.length > 0) {
                    aceito(results[0]);
                } else {
                    aceito(false);
                }
            });
        });
    },


    buscarUmUiid: (uuid) => {
        return new Promise((aceito, rejeitado) => {

            db.query('SELECT * FROM gta_cadastro_demografico_socio_economico  WHERE uuid = ? ', [uuid], (error, results) => {
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