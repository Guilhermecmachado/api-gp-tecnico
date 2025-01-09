const service = require('../services/dominios-service');
module.exports = {

    inserir: async (req, res) => {

        let json = { error: '', result: {} };
        console.log('insert')

        let nome = req.body.nome
        let codigo = req.body.codigo
        let status = req.body.status
        let grupo = req.body.grupo

        let id = await service.buscarUmCodigo(grupo)
        let id_grupo = id.id


        if (nome && codigo && status && grupo && id_grupo) {
            let model = await service.
                inserir(nome, codigo, status, grupo, id_grupo);
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
                codigo: model[i].codigo,
                grupo: model[i].grupo,
                id_grupo: model[i].id_grupo,

            });
        }
        res.json(json);
    },

    atualizar: async (req, res) => {
        console.log('atualiza')
        let json = { error: '', result: {} };

        let id = req.params.id;
        let nome = req.body.nome;
        let grupo = req.body.grupo;

        let id_g = await service.buscarUmCodigo(grupo)
        let id_grupo = id_g.id
        let codigo = req.body.codigo
        let status = req.body.status

        db_codigo = parseInt(id)

        if (nome && grupo && id_grupo && codigo && status) {
            await service.atualizar(db_codigo, nome, grupo, id_grupo, codigo, status);
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