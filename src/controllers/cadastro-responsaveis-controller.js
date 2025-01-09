const service = require('../services/cadastro-responsaveis-service');
module.exports = {

    inserir: async (req, res) => {
        let objectDate = new Date();
    
        let day = objectDate.getDate();
        let month = objectDate.getMonth() + 1;
        let year = objectDate.getFullYear();
    
        if (day < 10) day = '0' + day;
        if (month < 10) month = '0' + month;
    
        let json = { error: '', result: {} };
    
        let cadastro_cohab = req.body.dados_responsavel.cadastro_cohab;
        let cpf = req.body.dados_responsavel.cpf;
        let data_criacao = day.toString() + '/' + month.toString() + '/' + year.toString();
        let data_alteracao = req.body.dados_responsavel.data_alteracao;
        let data_nascimento = req.body.dados_responsavel.data_nascimento;
        let naturalidade = req.body.dados_responsavel.naturalidade;
        let valor_renda_bruta = req.body.dados_responsavel.valor_renda_bruta
        let valor_renda_liquida = req.body.dados_responsavel.valor_renda_liquida
        let valor_renda_declarada_liquida = req.body.dados_responsavel.valor_renda_declarada_liquida

        let nis = req.body.dados_responsavel.nis;
        let nome_completo = req.body.dados_responsavel.nome_completo;
        let numero_cadastro = req.body.numero_cadastro;
        let pais = req.body.dados_responsavel.pais;
        let projeto_id = req.body.projeto_id;
        let projeto_nome = req.body.projeto_nome;
        let rg = req.body.dados_responsavel.rg;
        let rg_data_expedicao = req.body.dados_responsavel.rg_data_expedicao;
        let rg_uf = req.body.dados_responsavel.rg_uf;
        let status_cadastro = req.body.dados_responsavel.status_cadastro;
        let tipo_cadastro = req.body.dados_responsavel.tipo_cadastro;
        let uf = req.body.dados_responsavel.uf;
        let contato1 = req.body.dados_responsavel.contato1;
        let contato2 = req.body.dados_responsavel.contato2;
        let tipo_contato1 = req.body.dados_responsavel.tipo_contato1;
        let tipo_contato2 = req.body.dados_responsavel.tipo_contato2;
        let cpf_cnpj_fonte_pegadora = req.body.dados_responsavel.cpf_cnpj_fonte_pegadora;
        let data_admissao = req.body.dados_responsavel.data_admissao;
    let tipo_renda=req.body.dados_responsavel.tipo_renda
        // Converte valores vazios para '0' e substitui vírgulas por pontos
        function parseCurrency(value) {
            if (typeof value === 'string') {
                // Remove qualquer caractere que não seja número, vírgula, ponto ou traço
                value = value.replace(/[^\d,.-]/g, '').replace(',', '.');
            }
            // Converte para float se o valor ainda for uma string
            return parseFloat(value) || 0; // Retorna 0 caso o valor seja inválido ou vazio
        }
        
        // Aplicando a função de conversão para cada valor
        valor_renda_liquida = parseCurrency(valor_renda_liquida);
        valor_renda_bruta = parseCurrency(valor_renda_bruta);
        valor_renda_declarada_liquida = parseCurrency(valor_renda_declarada_liquida);
    
        let mes_referencia_renda = req.body.dados_responsavel.mes_referencia_renda;
        let data_inicio_renda_declarada = req.body.dados_responsavel.data_inicio_renda_declarada;
        let mes_referencia_renda_declarada = req.body.dados_responsavel.mes_referencia_renda_declarada;
        let beneficio_prestacao = req.body.dados_responsavel.beneficio_prestacao;
        let programa_bolsa_familia = req.body.dados_responsavel.programa_bolsa_familia;
        let menor_18 = req.body.dados_responsavel.menor_18;
        let nome_tutor = req.body.dados_responsavel.nome_tutor;
        let cpf_tutor = req.body.dados_responsavel.cpf_tutor;
        let id_contato1 = req.body.dados_responsavel.id_contato1;
        let id_contato2 = req.body.dados_responsavel.id_contato2;
        let cadastrador_id = req.body.dados_responsavel.cadastrador_id;
        let status_online = req.body.dados_responsavel.status_online;
    
        if (data_criacao && numero_cadastro && projeto_id && projeto_nome) {
            let model = await service.inserir(
                cadastro_cohab, cpf, data_criacao, data_alteracao, data_nascimento, naturalidade, nis,
                nome_completo, numero_cadastro, pais, projeto_id, projeto_nome, rg, rg_data_expedicao, rg_uf,
                status_cadastro, tipo_cadastro, uf, contato1, contato2, tipo_contato1, tipo_contato2,
                cpf_cnpj_fonte_pegadora,tipo_renda, data_admissao, valor_renda_bruta, valor_renda_liquida, mes_referencia_renda,
                data_inicio_renda_declarada, valor_renda_declarada_liquida, mes_referencia_renda_declarada,
                beneficio_prestacao, programa_bolsa_familia, menor_18, nome_tutor, cpf_tutor, cadastrador_id, status_online
            );
            json.result = { id: model };
        } else {
            json.error = 'Campos não enviados';
        }
        res.json(json);
    },
    

    inserirImport: async (req, res) => {
        let objectDate = new Date();

        let day = objectDate.getDate();

        let month = objectDate.getMonth() + 1;

        let year = objectDate.getFullYear();

        if (day < 10) day = '0' + day;
        if (month < 10) month = '0' + month;
        let json = { error: '', result: {} };

        console.log('insert')

        let data_criacao = day.toString() + '/' + month.toString() + '/' + year.toString()
        let data_alteracao = day.toString() + '/' + month.toString() + '/' + year.toString()

        let projeto_id = req.body.projeto_id
        let projeto_nome = req.body.projeto_nome
        let tipo_cadastro = req.body.tipo_cadastro
        let nis = req.body.nis
        let numero_cadastro = req.body.numero_cadastro
        let nome_completo = req.body.nome_completo

        if (data_criacao && numero_cadastro && projeto_id && projeto_nome) {
            let model = await service.
                inserirImport(projeto_id, projeto_nome, nome_completo, tipo_cadastro, nis, numero_cadastro, data_criacao, data_alteracao);
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
                cadastro_cohab: model[i].cadastro_cohab,
                cpf: model[i].cpf,
                data_criacao: model[i].data_criacao,
                data_alteracao: model[i].data_alteracao,
                data_nascimento: model[i].data_nascimento,
                naturalidade: model[i].naturalidade,
                nis: model[i].nis,
                nome_completo: model[i].nome_completo,
                numero_cadastro: model[i].numero_cadastro,
                pais: model[i].pais,
                projeto_id: model[i].projeto_id,
                projeto_nome: model[i].projeto_nome,
                rg: model[i].rg,
                rg_data_expedicao: model[i].rg_data_expedicao,
                rg_uf: model[i].rg_uf,
                status_cadastro: model[i].status_cadastro,
                tipo_cadastro: model[i].tipo_cadastro,
                uf: model[i].uf,
                contato1: model[i].contato1,
                contato2: model[i].contato2,
                tipo_contato1: model[i].tipo_contato1,
                tipo_contato2: model[i].tipo_contato2,
                cpf_cnpj_fonte_pegadora: model[i].cpf_cnpj_fonte_pegadora,
                data_admissao: model[i].data_admissao,
                valor_renda_bruta: model[i].valor_renda_bruta,
                valor_renda_liquida: model[i].valor_renda_liquida,
                mes_referencia_renda: model[i].mes_referencia_renda,
                data_inicio_renda_declarada: model[i].data_inicio_renda_declarada,
                valor_renda_declarada_liquida: model[i].valor_renda_declarada_liquida,
                mes_referencia_renda_declarada: model[i].mes_referencia_renda_declarada,
                beneficio_prestacao: model[i].beneficio_prestacao,
                programa_bolsa_familia: model[i].programa_bolsa_familia,
                menor_18: model[i].menor_18,
                nome_tutor: model[i].nome_tutor,
                cpf_tutor: model[i].cpf_tutor,
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
        let cadastro_cohab = req.body.dados_responsavel.cadastro_cohab
        let cpf = req.body.dados_responsavel.cpf
        let data_alteracao = day.toString() + '/' + month.toString() + '/' + year.toString()
        let data_nascimento = req.body.dados_responsavel.data_nascimento
        let naturalidade = req.body.dados_responsavel.naturalidade
        let nis = req.body.dados_responsavel.nis
        let nome_completo = req.body.dados_responsavel.nome_completo
        let pais = req.body.dados_responsavel.pais
        let rg = req.body.dados_responsavel.rg
        let rg_data_expedicao = req.body.dados_responsavel.rg_data_expedicao
        let rg_uf = req.body.dados_responsavel.rg_uf
        let status_cadastro = req.body.dados_responsavel.status_cadastro
        let tipo_cadastro = req.body.dados_responsavel.tipo_cadastro
        let uf = req.body.dados_responsavel.uf
        let contato1 = req.body.dados_responsavel.contato1
        let contato2 = req.body.dados_responsavel.contato2
        let tipo_contato1 = req.body.dados_responsavel.tipo_contato1
        let tipo_contato2 = req.body.dados_responsavel.tipo_contato2
        let cpf_cnpj_fonte_pegadora = req.body.dados_responsavel.cpf_cnpj_fonte_pegadora
        let data_admissao = req.body.dados_responsavel.data_admissao
        let valor_renda_bruta = req.body.dados_responsavel.valor_renda_bruta
        let valor_renda_liquida = req.body.dados_responsavel.valor_renda_liquida
        let mes_referencia_renda = req.body.dados_responsavel.mes_referencia_renda
        let data_inicio_renda_declarada = req.body.dados_responsavel.data_inicio_renda_declarada
        let valor_renda_declarada_liquida = req.body.dados_responsavel.valor_renda_declarada_liquida
        let mes_referencia_renda_declarada = req.body.dados_responsavel.mes_referencia_renda_declarada
        let beneficio_prestacao = req.body.dados_responsavel.beneficio_prestacao.toString()
        let programa_bolsa_familia = req.body.dados_responsavel.programa_bolsa_familia.toString()
        let menor_18 = req.body.dados_responsavel.menor_18
        let nome_tutor = req.body.dados_responsavel.nome_tutor
        let cpf_tutor = req.body.dados_responsavel.cpf_tutor
        let cadastrador_id = req.body.dados_responsavel.cadastrador_id
        db_codigo = parseInt(id)
        let status_online = req.body.dados_responsavel.status_online
        let tipo_renda=req.body.dados_responsavel.tipo_renda


        function parseCurrency(value) {
            if (typeof value === 'string') {
                // Remove qualquer caractere que não seja número, vírgula, ponto ou traço
                value = value.replace(/[^\d,.-]/g, '').replace(',', '.');
            }
            // Converte para float se o valor ainda for uma string
            return parseFloat(value) || 0; // Retorna 0 caso o valor seja inválido ou vazio
        }
        
        // Aplicando a função de conversão para cada valor
        valor_renda_liquida = parseCurrency(valor_renda_liquida);
        valor_renda_bruta = parseCurrency(valor_renda_bruta);
        valor_renda_declarada_liquida = parseCurrency(valor_renda_declarada_liquida);
       

   
        if (id) {
            await service.atualizar(db_codigo, cadastro_cohab, cpf, data_nascimento, naturalidade, nis, nome_completo, pais, rg, rg_data_expedicao, rg_uf, status_cadastro, tipo_cadastro, uf, contato1, contato2, tipo_contato1, tipo_contato2, cpf_cnpj_fonte_pegadora,tipo_renda, data_admissao, valor_renda_bruta, valor_renda_liquida, mes_referencia_renda, data_inicio_renda_declarada, valor_renda_declarada_liquida, mes_referencia_renda_declarada, beneficio_prestacao, programa_bolsa_familia, menor_18, nome_tutor, cpf_tutor, cadastrador_id, status_online, data_alteracao);
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
        let numero_cadastro = req.params.numero_cadastro
        let tipo_cadastro = req.params.tipo_cadastro //para pegar o parametro
        let result = await service.buscarUm(id, numero_cadastro, tipo_cadastro);
        res.json(result);


    },


}