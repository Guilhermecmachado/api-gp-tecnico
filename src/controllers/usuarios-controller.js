const service = require('../services/usuarios-service');
const serviceper = require('../services/usuarios-permissoes-service')
module.exports = {




    inserir: async (req, res) => {

        let json = { error: '', result: {} };
        console.log('insert')
        let agencia = req.body.agencia
        let nome = req.body.nome
        let email = req.body.email
        let banco = req.body.banco
        let conta_corrente = req.body.conta_corrente
        let cpf = req.body.cpf
        let password = req.body.password
        let perfil = req.body.perfil
        let pix = req.body.pix



        let model = await service.
            inserir(agencia, nome, email, banco, conta_corrente, cpf, password, perfil, pix);
        json.result = {
            id: model,
        };

        res.json(json);
    },

    deletar: async (req, res) => {
       

       
        let json = { error: '', result: {} };

        let id = req.params.id;
    
        db_codigo = parseInt(id)

        if (id) {
            await service.deletar(db_codigo);
            json.result = {
                id,

            };
        } else {
            json.error = 'Os campos não foram enviados';
        }
        res.json(json);
    },

    inserirPermissaoUsuario: async (req, res) => {

        let json = { error: '', result: {} };
        console.log('insert')
        let menu_id = req.body.menu_id
        let rota = req.body.rota
        let usuario_id = req.body.usuario_id
        let permissao = req.body.permissao
        let usuario_nome = req.body.usuario_nome




        if (menu_id && rota && usuario_id && permissao) {
            let model = await service.
                inserirPermissaoUsuario(menu_id, rota, usuario_id, permissao,usuario_nome);
            json.result = {
                id: model,
            };
        } else {
            json.error = 'Campos não enviados';
        }
        res.json(json);
    },

    buscarTodos: async (req, res) => {
        let json = { error: '', result: [] };
        let model = await service.buscarTodosUsuario();
        for (let i in model) {
            json.result.push({
                id: model[i].id,
                nome: model[i].nome,
                email: model[i].email,

            });
        }
        res.json(json);
    },

    buscarTodosPermissao: async (req, res) => {
        let json = { error: '', result: [] };
        let model = await service.buscarTodosPermissao();
        for (let i in model) {
            json.result.push({
                id: model[i].id,
                label: model[i].label,
                rota: model[i].rota,

            });
        }
        res.json(json);
    },

    buscarTodosPermissaoUsuario: async (req, res) => {
        let json = { error: '', result: [] };
        let usuario_id = req.params.usuario_id
        let model = await service.buscarTodosPermissaoUsuario(usuario_id);
        for (let i in model) {
            json.result.push({
                id: model[i].id,
                label: model[i].label,
                rota: model[i].rota,
                usuario_id: model[i].usuario_id,
                permissao: model[i].permissao,
                usuario_nome: model[i].usuario_nome
            });
        }
        res.json(json);
    },


    atualizar: async (req, res) => {
        console.log('atualiza')
        let json = { error: '', result: {} };

        let id = req.params.id;
        let agencia = req.body.agencia
        let nome = req.body.nome
        let email = req.body.email
        let banco = req.body.banco
        let conta_corrente = req.body.conta_corrente
        let cpf = req.body.cpf
        let password = req.body.password
        let perfil = req.body.perfil
        let pix = req.body.pix




        db_codigo = parseInt(id)

        if (id) {
            await service.atualizar(db_codigo, agencia, nome, email, banco, conta_corrente, cpf, password, perfil, pix);
            json.result = {
                id,

            };
        } else {
            json.error = 'Os campos não foram enviados';
        }
        res.json(json);
    },

    atualizarPermissao: async (req, res) => {
        console.log('atualiza')
        let json = { error: '', result: {} };

        let id = req.params.id;
        let permissao = req.body.permissao



        db_codigo = parseInt(id)

        if (id) {
            await service.atualizarPermissao(db_codigo, permissao);
            json.result = {
                id,

            };
        } else {
            json.error = 'Os campos não foram enviados';
        }
        res.json(json);
    },

    buscarUm: async (req, res) => {
        let json = { error: '', result: {} };
        //  console.log('buscam um')
        let id = req.params.id; //para pegar o parametro
        let result = await service.buscarUmUsuario(id);
        res.json(result);


    },

    buscarUmUsuarioPermissao: async (req, res) => {
        let json = { error: '', result: {} };
        //  console.log('buscam um')
        let id = req.params.id;
        let rota_id = req.params.rota_id //para pegar o parametro
        let result = await service.buscarUmUsuarioPermissao(id, rota_id);
        res.json(result);


    },

    buscarUsuarioPermissao: async (req, res) => {
        let json = { error: '', result: {} };
        //  console.log('buscam um')
        let id = req.params.id;
        let result = await serviceper.buscarPermissaoUsario(id);
        res.json(result);


    },


}