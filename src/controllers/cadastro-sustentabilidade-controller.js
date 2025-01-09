const service = require('../services/cadastro-sustentabilidade-service');
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
        let forma_coleta = req.body.dados_sustentabilidade.forma_coleta
        let data_criacao = day.toString() + '/' + month.toString() + '/' + year.toString()
        let data_alteracao = req.body.dados_sustentabilidade.data_alteracao
        let numero_cadastro = req.body.numero_cadastro
        let separacao_material_reciclavel = req.body.dados_sustentabilidade.separacao_material_reciclavel
        let projeto_id = req.body.projeto_id
        let projeto_nome = req.body.projeto_nome
        let id_sustentabilidade = req.body.id_sustentabilidade
        let cadastrador_id = req.body.dados_sustentabilidade.cadastrador_id
        let status_online = req.body.dados_sustentabilidade.status_online

        if (data_criacao && numero_cadastro && projeto_id && projeto_nome) {
            let model = await service.
                inserir(data_criacao, data_alteracao, forma_coleta, numero_cadastro, separacao_material_reciclavel, projeto_id, projeto_nome, cadastrador_id, status_online);
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
                forma_coleta: model[i].forma_coleta,
                data_criacao: model[i].data_criacao,
                data_alteracao: model[i].data_alteracao,
                numero_cadastro: model[i].numero_cadastro,
                separacao_material_reciclavel: model[i].separacao_material_reciclavel,
                projeto_id: model[i].projeto_id,
                projeto_nome: model[i].projeto_nome,
                id_sustentabilidade: model[i].id_sustentabilidade,
                status_online: model[i].status_online
            });
        }
        res.json(json);
    },

    atualizar: async (req, res) => {
        console.log('atualiza')
        let objectDate = new Date();


        let day = objectDate.getDate();

        let month = objectDate.getMonth() + 1;

        let year = objectDate.getFullYear();

        if (day < 10) day = '0' + day;
        if (month < 10) month = '0' + month;
        let json = { error: '', result: {} };

        let id = req.params.id;
        let forma_coleta = req.body.dados_sustentabilidade.forma_coleta
        let data_alteracao = day.toString() + '/' + month.toString() + '/' + year.toString()
        let separacao_material_reciclavel = req.body.dados_sustentabilidade.separacao_material_reciclavel
        let cadastrador_id = req.body.dados_sustentabilidade.cadastrador_id
        let status_online = req.body.dados_sustentabilidade.status_online



        db_codigo = parseInt(id)

        if (id) {
            await service.atualizar(db_codigo, forma_coleta, separacao_material_reciclavel, cadastrador_id, status_online, data_alteracao);
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