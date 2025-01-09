
const service = require('../services/cadastro-violencia-maria-service');
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

        let data_criacao = day.toString() + '/' + month.toString() + '/' + year.toString()
        let data_alteracao = req.body.dados_maria.data_alteracao
        let numero_cadastro = req.body.numero_cadastro
        let maria_penha = req.body.dados_maria.maria_penha
        let projeto_id = req.body.projeto_id
        let projeto_nome = req.body.projeto_nome
        let cadastrador_id = req.body.dados_maria.cadastrador_id
        let status_online = req.body.dados_maria.status_online



        if (data_criacao && numero_cadastro && projeto_id && projeto_nome) {
            let model = await service.
                inserir(maria_penha, data_criacao, data_alteracao, numero_cadastro, projeto_id, projeto_nome, cadastrador_id, status_online);
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
                maria: model[i].maria_penha,
                projeto_id: model[i].projeto_id,
                projeto_nome: model[i].projeto_nome,
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

        let data_alteracao = day.toString() + '/' + month.toString() + '/' + year.toString()
        let maria_penha = req.body.dados_maria.maria_penha
        let cadastrador_id = req.body.dados_maria.cadastrador_id
        let status_online = req.body.dados_maria.status_online

        db_codigo = parseInt(id)

        if (id) {
            await service.atualizar(db_codigo, maria_penha, cadastrador_id, status_online, data_alteracao);
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