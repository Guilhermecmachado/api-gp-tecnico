const service = require('../services/projetos-service');
module.exports = {

    inserir: async (req, res) => {

        let json = { error: '', result: {} };
        console.log('insert')
        let entidade_nome = req.body.entidadeNome
        let nome_projeto = req.body.nomeProjeto
        let codigo = req.body.codigo
        let programa_nome = req.body.programaNome
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
                nome_projeto: model[i].nome_projeto,
                status: model[i].status,
                codigo: model[i].codigo,
                entidade_nome: model[i].entidade_nome,
                programa_nome: model[i].programa_nome,


            });
        }
        res.json(json);
    },

    buscarTodosUsuario: async (req, res) => {
        let json = { error: '', result: [] };
        let id = req.params.id
        let model = await service.buscarTodosUsuario(id);
        for (let i in model) {
            json.result.push({
                id: model[i].id,
                nome_projeto: model[i].projeto_nome,
                projeto_id: model[i].projeto_id,
                codigo: model[i].projeto_codigo,
                usuario_id: model[i].usuario_id,


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
        let programa_nome = req.body.programa_nome
        let nome_projeto = req.body.nome_projeto
        let codigo = req.body.codigo



        db_codigo = parseInt(id)

        if (id && entidade_nome && status && nome_projeto && codigo && programa_nome) {
            await service.atualizar(db_codigo, entidade_nome, nome_projeto, codigo, programa_nome, status);
            json.result = {
                id,
                nome_projeto,

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