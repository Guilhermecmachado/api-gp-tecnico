const service = require('../services/cadastro-dados-controle-service');
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
        let cep = req.body.dados_controle.cep
        let cidade = req.body.dados_controle.cidade
        let complemento = req.body.dados_controle.complemento
        let id_entrevistado = req.body.dados_controle.id_entrevistado
        let id_primeiro = req.body.dados_controle.id_primeiro
        let id_segundo = req.body.dados_controle.id_segundo
        let data_alteracao = req.body.dados_controle.data_alteracao
        let data_criacao = day.toString() + '/' + month.toString() + '/' + year.toString()
        let endereco = req.body.dados_controle.endereco
        let entrevistado = req.body.dados_controle.entrevistado
        let numero = req.body.dados_controle.numero
        let numero_cadastro = req.body.numero_cadastro
        let observacoes_contato = ''
        let observacoes=req.body.dados_controle.observacoes

        let primeiro_responsavel_trabalha = req.body.dados_controle.primeiro_responsavel_trabalha
        let projeto_nome = req.body.projeto_nome
        let projeto_id = req.body.projeto_id
        let segundo_responsavel_trabalha = req.body.dados_controle.segundo_responsavel_trabalha
        let cadastrador_id = req.body.cadastrador_id
        let uf = req.body.dados_controle.uf
        let status_online = req.body.dados_controle.status_online
        let data_entrevista = req.body.dados_controle.data_entrevista

        if (data_criacao && numero_cadastro && projeto_id && projeto_nome) {
            let model = await service.
                inserir(cep, cidade, complemento, data_alteracao, data_criacao, endereco, entrevistado, numero, numero_cadastro, observacoes_contato, primeiro_responsavel_trabalha, projeto_id, projeto_nome, segundo_responsavel_trabalha, uf,observacoes,data_entrevista, status_online, cadastrador_id);
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
                cep: model[i].cep,
                cidade: model[i].cidade,
                complemento: model[i].complemento,
                data_alteracao: model[i].data_alteracao,
                data_criacao: model[i].data_criacao,
                endereco: model[i].endereco,
                entrevistado: model[i].entrevistado,
                numero: model[i].numero,
                numero_cadastro: model[i].numero_cadastro,
                observacoes_contato: model[i].observacoes_contato,
                primeiro_responsavel_trabalha: model[i].primeiro_responsavel_trabalha,
                projeto_id: model[i].projeto_id,
                projeto_nome: model[i].projeto_nome,
                segundo_responsavel_trabalha: model[i].segundo_responsavel_trabalha,
                uf: model[i].uf,
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
        let cep = req.body.dados_controle.cep
        let cidade = req.body.dados_controle.cidade
        let complemento = req.body.dados_controle.complemento
        let contato1 = req.body.dados_controle.contato1
        let contato2 = req.body.dados_controle.contato2
        let data_alteracao = day.toString() + '/' + month.toString() + '/' + year.toString()
        let data_criacao = req.body.dados_controle.data_criacao
        let id_entrevistado = req.body.dados_controle.id_entrevistado
        let id_primeiro = req.body.dados_controle.id_primeiro
        let id_segundo = req.body.dados_controle.id_segundo
        let endereco = req.body.dados_controle.endereco
        let entrevistado = req.body.dados_controle.entrevistado
        let numero = req.body.dados_controle.numero
        let cadastrador_id = req.body.cadastrador_id
        let observacoes=req.body.dados_controle.observacoes
        let observacoes_contato = ''
        let primeiro_responsavel_trabalha = req.body.dados_controle.primeiro_responsavel_trabalha

        let segundo_responsavel_trabalha = req.body.dados_controle.segundo_responsavel_trabalha

        let uf = req.body.dados_controle.uf
        let status_online = req.body.dados_controle.status_online
        let data_entrevista = req.body.dados_controle.data_entrevista


        db_codigo = parseInt(id)

        if (id) {
            await service.atualizar(db_codigo, cep, cidade, complemento, endereco, entrevistado, numero, primeiro_responsavel_trabalha, segundo_responsavel_trabalha, uf,observacoes,data_entrevista, data_criacao, cadastrador_id, status_online, data_alteracao);
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