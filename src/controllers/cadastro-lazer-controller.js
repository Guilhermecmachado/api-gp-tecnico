const service = require('../services/cadastro-lazer-service');
module.exports = {




    inserir: async (req, res) => {
        let objectDate = new Date();


        let day = objectDate.getDate();

        let month = objectDate.getMonth() + 1;

        let year = objectDate.getFullYear();

        if (day < 10) day = '0' + day;
        if (month < 10) month = '0' + month;
        let json = { error: '', result: {} };
        console.log('insert')
        let atividade = req.body.dados_lazer.atividade
        let data_criacao = day.toString() + '/' + month.toString() + '/' + year.toString()
        let data_alteracao = req.body.data_alteracao
        let numero_cadastro = req.body.numero_cadastro
        let tipo_atividade = req.body.dados_lazer.tipo_atividade
        let tipo_atividade2 = req.body.dados_lazer.tipo_atividade2
        let tipo_atividade3 = req.body.dados_lazer.tipo_atividade3
        let tipo_atividade4 = req.body.dados_lazer.tipo_atividade4
        let projeto_id = req.body.projeto_id
        let projeto_nome = req.body.projeto_nome
        let cadastrador_id = req.body.dados_lazer.cadastrador_id
        let status_online = req.body.dados_lazer.status_online

        if (data_criacao && numero_cadastro && projeto_id && projeto_nome) {
            let model = await service.
                inserir(atividade, data_alteracao, data_criacao, numero_cadastro, tipo_atividade, tipo_atividade2, tipo_atividade4, tipo_atividade3, projeto_id, projeto_nome, cadastrador_id, status_online);
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
        let model = await service.buscarTodos();
        for (let i in model) {
            json.result.push({
                id: model[i].id,
                data_criacao: model[i].data_criacao,
                data_alteracao: model[i].data_alteracao,
                numero_cadastro: model[i].numero_cadastro,
                projeto_id: model[i].projeto_id,
                projeto_nome: model[i].projeto_nome,
                atividade: model[i].atividade,
                tipo_atividade: model[i].tipo_atividade,
                tipo_atividade2: model[i].tipo_atividade2,
                tipo_atividade3: model[i].tipo_atividade3,
                tipo_atividade4: model[i].tipo_atividade4,
                status_online: model[i].status_online


            });
        }
        res.json(json);
    },

    atualizar: async (req, res) => {
        let objectDate = new Date();


        let day = objectDate.getDate();

        let month = objectDate.getMonth() + 1;

        let year = objectDate.getFullYear();

        if (day < 10) day = '0' + day;
        if (month < 10) month = '0' + month;
        console.log('atualiza')
        let json = { error: '', result: {} };

        let id = req.params.id;
        let atividade = req.body.dados_lazer.atividade
        let data_alteracao = day.toString() + '/' + month.toString() + '/' + year.toString()
        let tipo_atividade = req.body.dados_lazer.tipo_atividade
        let tipo_atividade2 = req.body.dados_lazer.tipo_atividade2
        let tipo_atividade3 = req.body.dados_lazer.tipo_atividade3
        let tipo_atividade4 = req.body.dados_lazer.tipo_atividade4
        let cadastrador_id = req.body.dados_lazer.cadastrador_id
        let status_online = req.body.dados_lazer.status_online


        db_codigo = parseInt(id)

        if (id) {
            await service.atualizar(db_codigo, atividade, tipo_atividade, tipo_atividade2, tipo_atividade3, tipo_atividade4, cadastrador_id, status_online, data_alteracao);
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
        let id = req.params.id;
        let numero_cadastro = req.params.numero_cadastro //para pegar o parametro
        let result = await service.buscarUm(id, numero_cadastro);
        res.json(result);


    },


}