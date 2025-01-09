const service = require('../services/entidade-service');
module.exports = {

    inserir: async (req, res) => {

        let json = { error: '', result: {} };
        console.log('insert')
        let entidade_nome = req.body.entidade_nome
        let status = req.body.status



        if (entidade_nome && status) {
            let model = await service.
                inserir(entidade_nome, status);
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
                entidade_nome: model[i].entidade_nome,
                status: model[i].status,

            });
        }
        res.json(json);
    },

    atualizar: async (req, res) => {
        console.log('atualiza')
        let json = { error: '', result: {} };

        let id = req.params.id;
        let entidade_nome = req.body.entidade_nome;
        let status = req.body.status;


        db_codigo = parseInt(id)

        if (id && entidade_nome && status) {
            await service.atualizar(db_codigo, entidade_nome, status);
            json.result = {
                id,
                entidade_nome,

            };
        } else {
            json.error = 'Os campos não foram enviados';
        }
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

    buscarUm: async (req, res) => {
        let json = { error: '', result: {} };
        //  console.log('buscam um')
        let id = req.params.id; //para pegar o parametro
        let result = await service.buscarUm(id);
        res.json(result);


    },


}