const service = require('../services/projetos-service');
module.exports = {




    inserir: async (req, res) => {

        let json = { error: '', result: {} };
        console.log('insert')
        let entidade_nome = req.body.entidade_nome
        let nome_projeto = req.body.nome_projeto
        let codigo = req.body.codigo
        let programa_nome = req.body.programa_nome
        let status = req.body.status



        if (entidade_nome && nome_projeto && codigo && programa_nome && status) {
            let model = await service.
                inserir(entidade_nome, nome_projeto, codigo, programa_nome, status);
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
                // nome_regional: model[i].nome_regional,
                // status_regional: model[i].status_regional,

            });
        }
        res.json(json);
    },

    // atualizar: async (req, res) => {
    //     console.log('atualiza')
    //     let json = { error: '', result: {} };

    //     let id = req.params.id;
    //     let nome_regional = req.body.nome_regional;
    //     let status_regional = req.body.status_regional;

    //     let db_status = 0
    //     if (status_regional == '0')
    //         db_status = 0
    //     else
    //         db_status = 1

    //     db_codigo = parseInt(id)

    //     if (id && nome_regional && status_regional) {
    //         await regionalInstalacaoService.atualizar(db_codigo, nome_regional, db_status);
    //         json.result = {
    //             id,
    //             nome_regional,

    //         };
    //     } else {
    //         json.error = 'Os campos não foram enviados';
    //     }
    //     res.json(json);
    // },

    buscarUm: async (req, res) => {
        let json = { error: '', result: {} };
        //  console.log('buscam um')
        let id = req.params.id; //para pegar o parametro
        let result = await service.buscarUm(id);
        res.json(result);


    },


}