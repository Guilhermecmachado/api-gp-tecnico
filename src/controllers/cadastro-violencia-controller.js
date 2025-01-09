const service = require('../services/cadastro-violencia-service');
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
        let motivo = req.body.motivo
        let motivo_outros = req.body.motivo_outros
        let idade = req.body.idade
        let data_criacao = day.toString() + '/' + month.toString() + '/' + year.toString()
        let data_alteracao = ''
        let numero_cadastro = req.body.numero_cadastro
        let ano = req.body.ano
        let uuid = req.body.uuid
        let projeto_id = req.body.projeto_id
        let projeto_nome = req.body.projeto_nome
        let id_motivo = req.body.id_motivo
        let cadastrador_id = req.body.cadastrador_id
        let status_online = req.body.status_online

        if (data_criacao && numero_cadastro && projeto_id && projeto_nome) {
            let model = await service.
                inserir(motivo, motivo_outros, idade, data_criacao, data_alteracao, numero_cadastro, uuid, ano, projeto_id, projeto_nome, cadastrador_id, status_online);
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
                motivo: model[i].motivo,
                motivo_outros: model[i].motivo_outros,
                idade: model[i].idade,
                data_criacao: model[i].data_criacao,
                data_alteracao: model[i].data_alteracao,
                numero_cadastro: model[i].numero_cadastro,
                ano: model[i].ano,
                uuid: model[i].uuid,
                projeto_id: model[i].projeto_id,
                projeto_nome: model[i].projeto_nome,
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
        let ano = req.body.ano
        let motivo = req.body.motivo
        let motivo_outros = req.body.motivo_outros
        let idade = req.body.idade
        let data_alteracao = day.toString() + '/' + month.toString() + '/' + year.toString()
        let id_motivo = req.body.id_motivo
        let cadastrador_id = req.body.cadastrador_id
        let status_online = req.body.status_online


        db_codigo = parseInt(id)

        if (id) {
            await service.atualizar(db_codigo, motivo, motivo_outros, idade, ano, cadastrador_id, status_online, data_alteracao);
            json.result = {
                id,

            };
            console.log(json.result)
        } else {
            json.error = 'Os campos não foram enviados';
        }
        res.json(json);
    },


    deletar: async (req, res) => {
        console.log('deleta')  
        let json = { error: '', result: {} };

        let id = req.params.id;
     
        db_codigo = parseInt(id)

        if (id) {
            await service.deletar(db_codigo);
            json.result = {
                id,

            };
            console.log(json.result)
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

    buscarUmUiid: async (req, res) => {
        let json = { error: '', result: {} };
        //  console.log('buscam um')
        let uuid = req.params.uuid;
        let result = await service.buscarUmUiid(uuid);
        res.json(result);


    },

    buscarUmForm: async (req, res) => {
        let json = { error: '', result: {} };
        //  console.log('buscam um')
        let id = req.params.id; //para pegar o parametro
        let result = await service.buscarUmForm(id);
        res.json(result);


    },


}