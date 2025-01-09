
const db = require('../../db');


module.exports = {
    inserirUsuario: (agencia, nome_projeto, email, banco, conta_corrente, cpf, password, perfil, pix) => {
        return new Promise((accept, reject) => {

            db.query('INSERT INTO tb_usuarios (agencia, nome_projeto, email, banco,  conta_corrente, cpf, password, perfil, pix) VALUES (?,?,?,?,?,?,?,?,?,?)',
                [agencia, nome_projeto, email, banco, conta, conta_corrente, cpf, password, perfil, pix],
                (error, results) => {
                    if (error) { reject(error); return; }
                    accept(results.insertId); //insertId
                }
            );
        });
    },
    atualizar: (id, agencia, nome, email, banco, conta_corrente, cpf, password, perfil, pix) => {
        return new Promise((aceito, rejeitado) => {
            db.query('UPDATE gta_usuarios SET agencia=?, nome=?, email=?, banco=?, conta_corrente=?, cpf=?, password=?, perfil=?, pix=? WHERE id = ?',
                [agencia, nome, email, banco, conta_corrente, cpf, password, perfil, pix, id],
                (error, results) => {
                    if (error) { rejeitado(error); return; }
                    aceito(results);
                }
            );
        });
    },

    atualizarPermissao: (id, permissao) => {
        return new Promise((aceito, rejeitado) => {
            db.query('UPDATE gta_usuarios_permissao SET permissao=? WHERE id = ?',
                [permissao, id],
                (error, results) => {
                    if (error) { rejeitado(error); return; }
                    aceito(results);
                }
            );
        });
    },


    inserir: (agencia, nome, email, banco, conta_corrente, cpf, password, perfil, pix) => {
        return new Promise((accept, reject) => {

            db.query('INSERT INTO gta_usuarios (agencia, nome, email, banco, conta_corrente, cpf, password, perfil, pix) VALUES (?,?,?,?,?,?,?,?,?)',
                [agencia, nome, email, banco, conta_corrente, cpf, password, perfil, pix],
                (error, results) => {
                    if (error) { reject(error); return; }
                    accept(results.insertId); //insertId
                }
            );
        });
    },

    buscarTodosUsuario: () => {
        return new Promise((aceito, rejeitado) => {
            db.query('select * from gta_usuarios t order by t.nome', (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    },

    buscarTodosPermissao: () => {
        return new Promise((aceito, rejeitado) => {
            db.query('select * from gta_usuarios_permissao', (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    },


    buscarTodosPermissaoUsuario: (usuario_id) => {
        return new Promise((aceito, rejeitado) => {
            db.query('select * from gta_usuarios_permissao WHERE usuario_id =?', [usuario_id], (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    },


    inserirPermissaoUsuario: (menu_id, rota, usuario_id, permissao,usuario_nome) => {
        return new Promise((aceito, rejeitado) => {
            db.query('INSERT INTO  gta_usuarios_permissao  (menu_id, rota, usuario_id, permissao,usuario_nome) VALUES (?,?,?,?,?)',
                [menu_id, rota, usuario_id, permissao,usuario_nome],
                (error, results) => {
                    if (error) { rejeitado(error); return; }
                    aceito(results.insertId);
                }
            );
        });
    },
    buscarUmUsuario: (id) => {
        return new Promise((aceito, rejeitado) => {

            db.query('SELECT * FROM gta_usuarios WHERE id =?', [id], (error, results) => {
                if (error) { rejeitado(error); return; }
                if (results.length > 0) {
                    aceito(results[0]);
                } else {
                    aceito(false);
                }
            });
        });
    },

    buscarUmUsuarioPermissao: (id) => {
        return new Promise((aceito, rejeitado) => {

            db.query('SELECT * FROM gta_usuarios_permissao WHERE menu_id = ? AND usuario_id =?', [id], (error, results) => {
                if (error) { rejeitado(error); return; }
                if (results.length > 0) {
                    aceito(results[0]);
                } else {
                    aceito(false);
                }
            });
        });
    },


    atualizarPermissaoUsuario: (id, menu_id, permissao, rota, usuario_id) => {
        return new Promise((aceito, rejeitado) => {
            db.query('UPDATE gta_usuarios_permissao SET menu_id=?, permissao=?, rota=?, usuario_id=? WHERE id = ?',
                [menu_id, permissao, rota, usuario_id, id],
                (error, results) => {
                    if (error) { rejeitado(error); return; }
                    aceito(results);
                }
            );
        });
    },

    // buscarUmUsuario: (id) => {
    //     return new Promise((aceito, rejeitado) => {

    //         db.query('SELECT * FROM gta_usuarios WHERE id = ?', [id], (error, results) => {
    //             if (error) { rejeitado(error); return; }
    //             if (results.length > 0) {
    //                 aceito(results[0]);
    //             } else {
    //                 aceito(false);
    //             }
    //         });
    //     });
    // },

    // buscarUsuariosPermissoes: () => {
    //     return new Promise((aceito, rejeitado) => {

    //         db.query('SELECT * FROM tb_usuarios_permissao', (error, results) => {
    //             if (error) { rejeitado(error); return; }
    //             if (results.length > 0) {
    //                 aceito(results);
    //             } else {
    //                 aceito(false);
    //             }
    //         });
    //     });
    // },


    // verificaSeExiste: (email, senha) => {
    //     return new Promise((aceito, rejeitado) => {

    //         db.query('SELECT * FROM tb_usuarios WHERE email = ? AND senha =?', [email, senha], (error, results) => {
    //             if (error) { rejeitado(error); return; }
    //             if (results.length > 0) {
    //                 aceito(results[0]);
    //             } else {
    //                 aceito(false);
    //             }
    //         });
    //     });
    // },

    // verificaSeExisteApp: (email, senha) => {
    //     return new Promise((aceito, rejeitado) => {

    //         db.query('SELECT * FROM tb_tecnicos WHERE email = ? AND senha =?', [email, senha], (error, results) => {
    //             if (error) { rejeitado(error); return; }
    //             if (results.length > 0) {
    //                 aceito(results[0]);
    //             } else {
    //                 aceito(false);
    //             }
    //         });
    //     });
    // },

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

            db.query('SELECT * FROM gta_usuarios_permissao WHERE usuario_id = ? AND menu_id =?', [id_usuario, id_rota], (error, results) => {
                if (error) { rejeitado(error); return; }
                if (results.length > 0) {
                    aceito(results);
                } else {
                    aceito(false);
                }
            });
        });
    },

    deletar: (id) => {
        return new Promise((resolve, reject) => {
            db.query('UPDATE gta_usuarios SET status_usuario = "INATIVO" WHERE id = ?', [id], (error, results) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(results);
            });
        });
    },

}