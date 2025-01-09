
const db = require('../../db');


module.exports = {
    inserirUsuario: (nome, cpf, senha, status, email) => {
        return new Promise((accept, reject) => {

            db.query('INSERT INTO tb_usuarios (nome,cpf,senha, status,email) VALUES (?,?,?,?,?)',
                [nome, cpf, senha, status, email],
                (error, results) => {
                    if (error) { reject(error); return; }
                    accept(results.insertId); //insertId
                }
            );
        });
    },

    buscarTodosUsuario: () => {
        return new Promise((aceito, rejeitado) => {
            db.query('select * from tb_usuarios t order by t.nome', (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    },

    atualizarUsuario: (id, nome, cpf, senha, status_servico, email) => {
        return new Promise((aceito, rejeitado) => {
            db.query('UPDATE tb_usuarios SET nome = ?, cpf = ? , senha = ? ,status = ?, email =?  WHERE id = ?',
                [nome, cpf, senha, status_servico, email, id],
                (error, results) => {
                    if (error) { rejeitado(error); return; }
                    aceito(results);
                }
            );
        });
    },
    buscarUmUsuario: (id) => {
        return new Promise((aceito, rejeitado) => {

            db.query('SELECT * FROM tb_usuarios WHERE id = ?', [id], (error, results) => {
                if (error) { rejeitado(error); return; }
                if (results.length > 0) {
                    aceito(results[0]);
                } else {
                    aceito(false);
                }
            });
        });
    },

    buscarUmEmail: (email, senha) => {
        return new Promise((aceito, rejeitado) => {

            db.query('SELECT * FROM gta_usuarios WHERE email = ? AND password =?', [email, senha], (error, results) => {
                if (error) { rejeitado(error); return; }
                if (results.length > 0) {
                    aceito(results[0]);
                } else {
                    aceito(false);
                }
            });
        });
    },

    buscarUsuariosPermissoes: () => {
        return new Promise((aceito, rejeitado) => {

            db.query('SELECT * FROM tb_usuarios_permissao', (error, results) => {
                if (error) { rejeitado(error); return; }
                if (results.length > 0) {
                    aceito(results);
                } else {
                    aceito(false);
                }
            });
        });
    },


    verificaSeExiste: (email, senha) => {
        return new Promise((aceito, rejeitado) => {

            db.query('SELECT * FROM tb_usuarios WHERE email = ? AND senha =?', [email, senha], (error, results) => {
                if (error) { rejeitado(error); return; }
                if (results.length > 0) {
                    aceito(results[0]);
                } else {
                    aceito(false);
                }
            });
        });
    },

    verificaSeExisteApp: (email, senha) => {
        return new Promise((aceito, rejeitado) => {

            db.query('SELECT * FROM tb_tecnicos WHERE email = ? AND senha =?', [email, senha], (error, results) => {
                if (error) { rejeitado(error); return; }
                if (results.length > 0) {
                    aceito(results[0]);
                } else {
                    aceito(false);
                }
            });
        });
    },

    inserirUsuarioPermissao: (rota_id, permissao, usuario_id, nome_rota) => {
        return new Promise((accept, reject) => {

            db.query('INSERT INTO tb_usuarios_permissao (rota_id,permissao,usuario_id,nome_rota) VALUES (?,?,?,?)',
                [rota_id, permissao, usuario_id, nome_rota],
                (error, results) => {
                    if (error) { reject(error); return; }
                    accept(results.insertId); //insertId
                }
            );
        });
    },

    inserirUsuarioPermissaoCriar: (rota_id, criar, usuario_id, nome_rota) => {
        return new Promise((accept, reject) => {

            db.query('INSERT INTO tb_usuarios_permissao (rota_id,criar,usuario_id,nome_rota) VALUES (?,?,?,?)',
                [rota_id, criar, usuario_id, nome_rota],
                (error, results) => {
                    if (error) { reject(error); return; }
                    accept(results.insertId); //insertId
                }
            );
        });
    },

    inserirUsuarioPermissaoEditar: (rota_id, editar, usuario_id, nome_rota) => {
        return new Promise((accept, reject) => {

            db.query('INSERT INTO tb_usuarios_permissao (rota_id,editar,usuario_id,nome_rota) VALUES (?,?,?,?)',
                [rota_id, editar, usuario_id, nome_rota],
                (error, results) => {
                    if (error) { reject(error); return; }
                    accept(results.insertId); //insertId
                }
            );
        });
    },

    buscarTodosRotas: () => {
        return new Promise((aceito, rejeitado) => {
            db.query('select * from tb_itens_menu t order by t.nome_rota', (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    },

    buscarUmUsuarioPermissao: (id_usuario, id_rota) => {
        return new Promise((aceito, rejeitado) => {

            db.query('SELECT * FROM tb_usuarios_permissao WHERE usuario_id = ? AND rota_id =?', [id_usuario, id_rota], (error, results) => {
                if (error) { rejeitado(error); return; }
                if (results.length > 0) {
                    aceito(results);
                } else {
                    aceito(false);
                }
            });
        });
    },

    buscarUmUsuarioPermissaoRota: (id_usuario, id_rota) => {
        return new Promise((aceito, rejeitado) => {

            db.query('SELECT * FROM tb_usuarios_permissao WHERE usuario_id = ? AND rota_id =? AND permissao =1', [id_usuario, id_rota], (error, results) => {
                if (error) { rejeitado(error); return; }
                if (results.length > 0) {
                    aceito(results);
                } else {
                    aceito(false);
                }
            });
        });
    },

    buscarUmUsuarioPermissaoUsuario: (id_usuario) => {
        return new Promise((aceito, rejeitado) => {

            db.query('SELECT * FROM `tb_usuarios_permissao` WHERE usuario_id = ? AND rota_id = 11 AND criar =1 AND editar = 1', [id_usuario], (error, results) => {
                if (error) { rejeitado(error); return; }
                if (results.length > 0) {
                    aceito(results);
                } else {
                    aceito(false);
                }
            });
        });
    },



    buscarUmUsuarioPermissaoCria: (id_usuario, id_rota) => {
        return new Promise((aceito, rejeitado) => {

            db.query('SELECT * FROM tb_usuarios_permissao WHERE usuario_id = ? AND rota_id =? AND criar = 1', [id_usuario, id_rota], (error, results) => {
                if (error) { rejeitado(error); return; }
                if (results.length > 0) {
                    aceito(results);
                } else {
                    aceito(false);
                }
            });
        });
    },

    verificaUsuarioPermissaoCria: (id_usuario, id_rota) => {
        return new Promise((aceito, rejeitado) => {

            db.query('SELECT * FROM tb_usuarios_permissao WHERE usuario_id = ? AND rota_id =?', [id_usuario, id_rota], (error, results) => {
                if (error) { rejeitado(error); return; }
                if (results.length > 0) {
                    aceito(results);
                } else {
                    aceito(false);
                }
            });
        });
    },

    verificaUsuarioPermissaoEdita: (id_usuario, id_rota) => {
        return new Promise((aceito, rejeitado) => {

            db.query('SELECT * FROM tb_usuarios_permissao WHERE usuario_id = ? AND rota_id =?', [id_usuario, id_rota], (error, results) => {
                if (error) { rejeitado(error); return; }
                if (results.length > 0) {
                    aceito(results);
                } else {
                    aceito(false);
                }
            });
        });
    },

    buscarUmUsuarioPermissaoEdita: (id_usuario, id_rota) => {
        return new Promise((aceito, rejeitado) => {

            db.query('SELECT * FROM tb_usuarios_permissao WHERE usuario_id = ? AND rota_id =? AND editar = 1', [id_usuario, id_rota], (error, results) => {
                if (error) { rejeitado(error); return; }
                if (results.length > 0) {
                    aceito(results);
                } else {
                    aceito(false);
                }
            });
        });
    },




    atualizarUsuarioPermissao: (id, permissao) => {
        return new Promise((aceito, rejeitado) => {
            db.query('UPDATE tb_usuarios_permissao SET permissao = ? WHERE id = ?',
                [permissao, id],
                (error, results) => {
                    if (error) { rejeitado(error); return; }
                    aceito(results);
                }
            );
        });
    },

    atualizarUsuarioPermissaoCriar: (id, criar) => {
        return new Promise((aceito, rejeitado) => {
            db.query('UPDATE tb_usuarios_permissao SET criar = ? WHERE id = ?',
                [criar, id],
                (error, results) => {
                    if (error) { rejeitado(error); return; }
                    aceito(results);
                }
            );
        });
    },


    atualizarUsuarioPermissaoEditar: (id, editar) => {
        return new Promise((aceito, rejeitado) => {
            db.query('UPDATE tb_usuarios_permissao SET editar = ? WHERE id = ?',
                [editar, id],
                (error, results) => {
                    if (error) { rejeitado(error); return; }
                    aceito(results);
                }
            );
        });
    },


    buscarPermissaoUsario: (id) => {
        return new Promise((aceito, rejeitado) => {

            db.query('SELECT * FROM gta_usuarios_permissao WHERE id = ? ', [id], (error, results) => {
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