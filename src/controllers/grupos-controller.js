const service = require('../services/grupos-service');
module.exports = {

    inserir: async (req, res) => {

        let json = { error: '', result: {} };
        console.log('insert')

        let nome = req.body.nome
        let codigo = req.body.codigo
        let status = req.body.status

        if (nome && codigo && status) {
            let model = await service.inserir(nome, codigo, status);
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
                nome: model[i].nome,
                status: model[i].status,
                codigo: model[i].codigo

            });
        }
        res.json(json);
    },

    atualizar: async (req, res) => {
        console.log('atualiza')
        let json = { error: '', result: {} };

        let id = req.params.id;
        let nome = req.body.nome;
        let status = req.body.status;
        let codigo = req.body.codigo



        db_codigo = parseInt(id)

        if (id && nome && status && codigo) {
            await service.atualizar(db_codigo, nome, status, codigo);
            json.result = {
                id,
                nome,

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