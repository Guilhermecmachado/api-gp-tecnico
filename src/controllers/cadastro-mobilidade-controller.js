const service = require('../services/cadastro-mobilidade-service');
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
        let forma_transporte = req.body.dados_mobilidade.forma_transporte
        let forma_transporte_outro = req.body.dados_mobilidade.forma_transporte_outro
        let possui_veiculo_carro = req.body.dados_mobilidade.possui_veiculo_carro
        let possui_veiculo_moto = req.body.dados_mobilidade.possui_veiculo_moto
        let possui_veiculo_caminhao = req.body.dados_mobilidade.possui_veiculo_caminhao
        let possui_veiculo_caminhao_suv = req.body.dados_mobilidade.possui_veiculo_caminhonete_suv
        let regiao_trabalho = req.body.dados_mobilidade.regiao_trabalho
        let data_criacao = day.toString() + '/' + month.toString() + '/' + year.toString()
        let data_alteracao = req.body.dados_mobilidade.data_alteracao
        let numero_cadastro = req.body.numero_cadastro
        let projeto_id = req.body.projeto_id
        let projeto_nome = req.body.projeto_nome
        let valor_carro
        let valor_moto
        let valor_caminhao
        let valor_caminhao_suv
        let id_transporte = req.body.dados_mobilidade.id_transporte
        let id_regiao = req.body.dados_mobilidade.id_regiao
        let cadastrador_id = req.body.dados_mobilidade.cadastrador_id
        let status_online = req.body.dados_mobilidade.status_online


        if (possui_veiculo_carro == true) {
            valor_carro = 1
        } else {
            valor_carro = 0
        }
        if (possui_veiculo_moto == true) {
            valor_moto = 1
        } else {
            valor_moto = 0
        }
        if (possui_veiculo_caminhao == true) {
            valor_caminhao = 1
        } else {
            valor_caminhao = 0
        }
        if (possui_veiculo_caminhao_suv == true) {
            valor_caminhao_suv = 1
        } else {
            valor_caminhao_suv = 0
        }


        if (data_criacao && numero_cadastro && projeto_id && projeto_nome) {
            let model = await service.
                inserir(data_criacao, data_alteracao, forma_transporte, forma_transporte_outro, numero_cadastro, valor_caminhao, valor_caminhao_suv, valor_carro, valor_moto, regiao_trabalho, projeto_id, projeto_nome, cadastrador_id, status_online);
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
                projeto_id: model[i].projeto_id,
                projeto_nome: model[i].projeto_nome,
                forma_transporte: model[i].forma_transporte,
                forma_transporte_outro: model[i].forma_transporte_outro,
                possui_veiculo_carro: model[i].possui_veiculo_carro,
                possui_veiculo_moto: model[i].possui_veiculo_moto,
                possui_veiculo_caminhao: model[i].possui_veiculo_caminhao,
                possui_veiculo_caminhao_suv: model[i].possui_veiculo_caminhonete_suv,
                regiao_trabalho: model[i].regiao_trabalho,
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
        let forma_transporte = req.body.dados_mobilidade.forma_transporte
        let forma_transporte_outro = req.body.dados_mobilidade.forma_transporte_outro
        let possui_veiculo_carro = req.body.dados_mobilidade.possui_veiculo_carro
        let possui_veiculo_moto = req.body.dados_mobilidade.possui_veiculo_moto
        let possui_veiculo_caminhao = req.body.dados_mobilidade.possui_veiculo_caminhao
        let possui_veiculo_caminhao_suv = req.body.dados_mobilidade.possui_veiculo_caminhonete_suv
        let regiao_trabalho = req.body.dados_mobilidade.regiao_trabalho
        let data_alteracao = day.toString() + '/' + month.toString() + '/' + year.toString()
        let cadastrador_id = req.body.dados_mobilidade.cadastrador_id
        let status_online = req.body.dados_mobilidade.status_online

        let valor_carro
        let valor_moto
        let valor_caminhao
        let valor_caminhao_suv


        if (possui_veiculo_carro == true) {
            valor_carro = 1
        } else {
            valor_carro = 0
        }
        if (possui_veiculo_moto == true) {
            valor_moto = 1
        } else {
            valor_moto = 0
        }
        if (possui_veiculo_caminhao == true) {
            valor_caminhao = 1
        } else {
            valor_caminhao = 0
        }
        if (possui_veiculo_caminhao_suv == true) {
            valor_caminhao_suv = 1
        } else {
            valor_caminhao_suv = 0
        }


        db_codigo = parseInt(id)

        if (id) {
            await service.atualizar(db_codigo, valor_carro, valor_caminhao, valor_caminhao_suv, valor_moto, forma_transporte, forma_transporte_outro, regiao_trabalho, cadastrador_id, status_online, data_alteracao);
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