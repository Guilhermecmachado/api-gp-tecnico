const service = require('../services/cadastro-animal-service');
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
        let animal_moradia = req.body.dados_animais.animal_moradia
        let data_alteracao = req.body.dados_animais.data_alteracao
        let data_criacao = day.toString() + '/' + month.toString() + '/' + year.toString()
        let numero_cadastro = req.body.numero_cadastro
        let cadastrador_id = req.body.dados_animais.cadastrador_id
        let projeto_id = req.body.projeto_id
        let projeto_nome = req.body.projeto_nome
        let status_online = req.body.dados_animais.status_online


        if (data_criacao && numero_cadastro && projeto_id && projeto_nome) {
            let model = await service.
                inserir(animal_moradia, data_alteracao, data_criacao, numero_cadastro, projeto_id, projeto_nome, status_online, cadastrador_id);
            json.result = {
                id: model,
            };
            console.log(json.result, 'insert')
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
                animal_moradia: model[i].animal_moradia,
                projeto_id: model[i].projeto_id,
                projeto_nome: model[i].projeto_nome,
                numero_cadastro: model[i].numero_cadastro,
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
        console.log('diga-me oq aconteceeeeeeeeee')
        let id = req.params.id;
        let animal_moradia = req.body.dados_animais.animal_moradia
        let data_alteracao = day.toString() + '/' + month.toString() + '/' + year.toString()
        let cadastrador_id = req.body.dados_animais.cadastrador_id
        let status_online = req.body.dados_animais.status_online
        db_codigo = parseInt(id)

        if (id) {
            await service.atualizar(db_codigo, animal_moradia, cadastrador_id, status_online, data_alteracao);
            json.result = {
                id,


            };
            console.log(json.result, 'diga-me oq aconteceeeeeeeeeee')
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