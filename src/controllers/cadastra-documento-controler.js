const service = require('../services/cadastra-documento-service');
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
        let documento1 = req.body.dados_caixa.documento1
        let documento2 = req.body.dados_caixa.documento2
        let documento3 = req.body.dados_caixa.documento3
        let documento4 = req.body.dados_caixa.documento4
        let documento5 = req.body.dados_caixa.documento5
        let documento6 = req.body.dados_caixa.documento6
        let documento7 = req.body.dados_caixa.documento7
        let data_criacao = day.toString() + '/' + month.toString() + '/' + year.toString()
        let data_alteracao = ''
        let numero_cadastro = req.body.numero_cadastro
        let projeto_id = req.body.projeto_id
        let projeto_nome = req.body.projeto_nome
        let documento8 = req.body.dados_caixa.documento8
        let documento9 = req.body.dados_caixa.documento9
        let documento10 = req.body.dados_caixa.documento10
        let documento11 = req.body.dados_caixa.documento11
        let cadastrador_id = req.body.dados_caixa.cadastrador_id
        let status_online = req.body.dados_caixa.status_online
        let observacoes =req.body.dados_caixa.observacoes
        let valor_documento1
        let valor_documento2
        let valor_documento3
        let valor_documento4
        let valor_documento5
        let valor_documento6
        let valor_documento7
        let valor_documento8
        let valor_documento9
        let valor_documento10
        let valor_documento11


        if (documento1 == true) {
            valor_documento1 = 1
        } else {
            valor_documento1 = 0
        }
        if (documento2 == true) {
            valor_documento2 = 1
        } else {
            valor_documento2 = 0
        }
        if (documento3 == true) {
            valor_documento3 = 1
        } else {
            valor_documento3 = 0
        }
        if (documento4 == true) {
            valor_documento4 = 1
        } else {
            valor_documento4 = 0
        }
        if (documento5 == true) {
            valor_documento5 = 1
        } else {
            valor_documento5 = 0
        }
        if (documento6 == true) {
            valor_documento6 = 1
        } else {
            valor_documento6 = 0
        }
        if (documento7 == true) {
            valor_documento7 = 1
        } else {
            valor_documento7 = 0
        }
        if (documento8 == true) {
            valor_documento8 = 1
        } else {
            valor_documento8 = 0
        }
        if (documento9 == true) {
            valor_documento9 = 1
        } else {
            valor_documento9 = 0
        }
        if (documento10 == true) {
            valor_documento10 = 1
        } else {
            valor_documento10 = 0
        }
        if (documento11 == true) {
            valor_documento11 = 1
        } else {
            valor_documento11 = 0
        }


        if (data_criacao && numero_cadastro && projeto_id && projeto_nome) {
            let model = await service.
                inserir(data_criacao, data_alteracao, valor_documento1, valor_documento2, valor_documento3, valor_documento4, valor_documento5, valor_documento6, valor_documento7, valor_documento8, valor_documento9, valor_documento10, valor_documento11,observacoes, projeto_id, projeto_nome, numero_cadastro, status_online, cadastrador_id);
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
                documento1: model[i].documento1,
                documento2: model[i].documento2,
                documento3: model[i].documento3,
                documento4: model[i].documento4,
                documento5: model[i].documento5,
                documento6: model[i].documento6,
                documento7: model[i].documento7,
                documento8: model[i].documento8,
                documento9: model[i].documento9,
                documento10: model[i].documento10,
                documento11: model[i].documento11,
                numero_cadastro: model[i].numero_cadastro,
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
        let documento1 = req.body.dados_caixa.documento1
        let documento2 = req.body.dados_caixa.documento2
        let documento3 = req.body.dados_caixa.documento3
        let documento4 = req.body.dados_caixa.documento4
        let documento5 = req.body.dados_caixa.documento5
        let documento6 = req.body.dados_caixa.documento6
        let documento7 = req.body.dados_caixa.documento7
        let documento8 = req.body.dados_caixa.documento8
        let documento9 = req.body.dados_caixa.documento9
        let documento10 = req.body.dados_caixa.documento10
        let documento11 = req.body.dados_caixa.documento11
        let observacoes =req.body.dados_caixa.observacoes
        let cadastrador_id = req.body.dados_caixa.cadastrador_id
        let status_online = req.body.dados_caixa.status_online
        let valor_documento1
        let valor_documento2
        let valor_documento3
        let valor_documento4
        let valor_documento5
        let valor_documento6
        let valor_documento7
        let valor_documento8
        let valor_documento9
        let valor_documento10
        let valor_documento11


        if (documento1 == true) {
            valor_documento1 = 1
        } else {
            valor_documento1 = 0
        }
        if (documento2 == true) {
            valor_documento2 = 1
        } else {
            valor_documento2 = 0
        }
        if (documento3 == true) {
            valor_documento3 = 1
        } else {
            valor_documento3 = 0
        }
        if (documento4 == true) {
            valor_documento4 = 1
        } else {
            valor_documento4 = 0
        }
        if (documento5 == true) {
            valor_documento5 = 1
        } else {
            valor_documento5 = 0
        }
        if (documento6 == true) {
            valor_documento6 = 1
        } else {
            valor_documento6 = 0
        }
        if (documento7 == true) {
            valor_documento7 = 1
        } else {
            valor_documento7 = 0
        }
        if (documento8 == true) {
            valor_documento8 = 1
        } else {
            valor_documento8 = 0
        }
        if (documento9 == true) {
            valor_documento9 = 1
        } else {
            valor_documento9 = 0
        }
        if (documento10 == true) {
            valor_documento10 = 1
        } else {
            valor_documento10 = 0
        }
        if (documento11 == true) {
            valor_documento11 = 1
        } else {
            valor_documento11 = 0
        }





        db_codigo = parseInt(id)

        if (id) {
            await service.atualizar(db_codigo, valor_documento1, valor_documento2, valor_documento3, valor_documento4, valor_documento5, valor_documento6, valor_documento7, valor_documento8, valor_documento9, valor_documento10, valor_documento11,observacoes, cadastrador_id, status_online, data_alteracao);
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
        let numero_cadastro = req.params.numero_cadastro//para pegar o parametro
        let result = await service.buscarUm(id, numero_cadastro);
        res.json(result);


    },


}