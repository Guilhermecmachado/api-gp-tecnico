const service = require('../services/cadastro-esportes-service');
module.exports = {




    inserir: async (req, res) => {
        let objectDate = new Date();
        let valor_bairro
        let valor_entidade_recriativa
        let valor_entidade_religiosa
        let valor_movimento_luta
        let valor_outros
        let valor_partido_politico
        let valor_sindicato
        let day = objectDate.getDate();

        let month = objectDate.getMonth() + 1;

        let year = objectDate.getFullYear();

        if (day < 10) day = '0' + day;
        if (month < 10) month = '0' + month;
        let json = { error: '', result: {} };
        console.log('insert')
        let associado_bairro = req.body.dados_comunitario.associacao_bairro
        let data_criacao = day.toString() + '/' + month.toString() + '/' + year.toString()
        let data_alteracao = req.body.data_alteracao
        let numero_cadastro = req.body.numero_cadastro
        let entidade_recriativas = req.body.dados_comunitario.entidade_recreativas
        let entidades_religiosas = req.body.dados_comunitario.entidade_relegiosa
        let especifique = req.body.dados_comunitario.especifique
        let movimento_luta_moradia = req.body.dados_comunitario.movimento_luta_moradia
        let outros = req.body.dados_comunitario.outros
        let partidos_politicos = req.body.dados_comunitario.partidos_politicos
        let sindicatos = req.body.dados_comunitario.sindicatos
        let projeto_id = req.body.projeto_id
        let projeto_nome = req.body.projeto_nome
        let cadastrador_id = req.body.dados_comunitario.cadastrador_id
        let status_online = req.body.dados_comunitario.status_online

        if (associado_bairro == true) {
            valor_bairro = 1
        } else {
            valor_bairro = 0
        }
        if (entidade_recriativas == true) {
            valor_entidade_recriativa = 1
        } else {
            valor_entidade_recriativa = 0
        }
        if (entidades_religiosas == true) {
            valor_entidade_religiosa = 1
        } else {
            valor_entidade_religiosa = 0
        }
        if (movimento_luta_moradia == true) {
            valor_movimento_luta = 1
        } else {
            valor_movimento_luta = 0
        }
        if (outros == true) {
            valor_outros = 1
        } else {
            valor_outros = 0
        }
        if (partidos_politicos == true) {
            valor_partido_politico = 1
        } else {
            valor_partido_politico = 0
        }
        if (sindicatos == true) {
            valor_sindicato = 1
        } else {
            valor_sindicato = 0
        }




        if (data_criacao && numero_cadastro && projeto_id && projeto_nome) {
            let model = await service.
                inserir(valor_bairro, data_criacao, data_alteracao, valor_entidade_recriativa, valor_entidade_religiosa, especifique, valor_movimento_luta, valor_outros, valor_partido_politico, valor_sindicato, numero_cadastro, projeto_id, projeto_nome, cadastrador_id, status_online);
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
                associado_bairro: model[i].associacao_bairro,
                entidade_recriativas: model[i].entidade_recreativas,
                entidades_religiosas: model[i].entidade_relegiosa,
                especifique: model[i].especifique,
                movimento_luta_moradia: model[i].movimento_luta_moradia,
                outros: model[i].outros,
                partidos_politicos: model[i].partidos_politicos,
                sindicatos: model[i].sindicatos,
                status_online: model[i].status_online


            });
        }
        res.json(json);
    },

    atualizar: async (req, res) => {

        console.log('atualiza')
        let objectDate = new Date();
        let valor_bairro
        let valor_entidade_recriativa
        let valor_entidade_religiosa
        let valor_movimento_luta
        let valor_outros
        let valor_partido_politico
        let valor_sindicato
        let day = objectDate.getDate();

        let month = objectDate.getMonth() + 1;

        let year = objectDate.getFullYear();

        if (day < 10) day = '0' + day;
        if (month < 10) month = '0' + month;
        let json = { error: '', result: {} };

        let id = req.params.id;
        let associado_bairro = req.body.dados_comunitario.associacao_bairro
        let data_alteracao = day.toString() + '/' + month.toString() + '/' + year.toString()
        let entidade_recriativas = req.body.dados_comunitario.entidade_recreativas
        let entidades_religiosas = req.body.dados_comunitario.entidade_relegiosa
        let especifique = req.body.dados_comunitario.especifique
        let movimento_luta_moradia = req.body.dados_comunitario.movimento_luta_moradia
        let outros = req.body.dados_comunitario.outros
        let partidos_politicos = req.body.dados_comunitario.partidos_politica
        let sindicatos = req.body.dados_comunitario.sindicatos
        let cadastrador_id = req.body.dados_comunitario.cadastrador_id
        let status_online = req.body.dados_comunitario.status_online


        if (associado_bairro == true) {
            valor_bairro = 1
        } else {
            valor_bairro = 0
        }
        if (entidade_recriativas == true) {
            valor_entidade_recriativa = 1
        } else {
            valor_entidade_recriativa = 0
        }
        if (entidades_religiosas == true) {
            valor_entidade_religiosa = 1
        } else {
            valor_entidade_religiosa = 0
        }
        if (movimento_luta_moradia == true) {
            valor_movimento_luta = 1
        } else {
            valor_movimento_luta = 0
        }
        if (outros == true) {
            valor_outros = 1
        } else {
            valor_outros = 0
        }
        if (partidos_politicos == true) {
            valor_partido_politico = 1
        } else {
            valor_partido_politico = 0
        }
        if (sindicatos == true) {
            valor_sindicato = 1
        } else {
            valor_sindicato = 0
        }




        db_codigo = parseInt(id)

        if (id) {
            await service.atualizar(db_codigo, valor_bairro, valor_entidade_recriativa, valor_entidade_religiosa, valor_movimento_luta, valor_outros, valor_partido_politico, valor_sindicato, especifique, cadastrador_id, status_online, data_alteracao);
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