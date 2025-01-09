const service = require('../services/cadastro-demografico-service');
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
        let beneficios = req.body.beneficios
        let beneficios_valor = req.body.beneficios_valor
        let curso_frequenta = req.body.curso_frequenta
        let data_alteracao = req.body.data_alteracao
        let data_criacao = day.toString() + '/' + month.toString() + '/' + year.toString()
        let estado_civil = req.body.estado_civil
        let estudou_ate = req.body.estudou_ate
        let frequenta_escola = req.body.frequenta_escola
        let genero = req.body.genero
        let grupo_etnico = req.body.grupo_etnico
        let idade = req.body.idade
        let numero_cadastro = req.body.numero_cadastro
        let nome_completo = req.body.nome_completo
        let outra_fonte_renda = req.body.outra_fonte_renda
        let outra_fonte_renda_valor = req.body.outra_fonte_renda_valor
        let pne = req.body.pne
        let posicao_familiar = req.body.posicao_familia
        let profissao = req.body.profissao
        let projeto_id = req.body.projeto_id
        let projeto_nome = req.body.projeto_nome
        let renda_principal = req.body.renda_principal
        let renda_principal_valor = req.body.renda_principal_valor
        let situacao_ocupacional = req.body.situacao_ocupacional
        let uuid = req.body.uuid
        let cid = req.body.cid
        let id_genero = req.body.id_genero
        let id_posicao = req.body.id_posicao
        let id_situacao = req.body.id_situacao
        let id_estado_civil = req.body.id_estado_civil
        let id_grupo = req.body.id_grupo
        let id_pne = req.body.pne
        let id_curso = req.body.id_curso
        let cadastrador_id = req.body.cadastrador_id
        let cancer = req.body.cancer
        let autismo = req.body.autismo
        let gestante = req.body.gestante
        let status_online = req.body.status_online
if(projeto_nome == undefined){
    projeto_nome ='ATUALIZAR FAMILIAR'
}
        function parseCurrency(value) {
            if (typeof value === 'string') {
                // Remove qualquer caractere que não seja número, vírgula, ponto ou traço
                value = value.replace(/[^\d,.-]/g, '').replace(',', '.');
            }
            // Converte para float se o valor ainda for uma string
            return parseFloat(value) || 0; // Retorna 0 caso o valor seja inválido ou vazio
        }
        
        // Aplicando a função de conversão para cada valor
        outra_fonte_renda_valor = parseCurrency(outra_fonte_renda_valor);
        renda_principal_valor = parseCurrency(renda_principal_valor);
        beneficios_valor = parseCurrency(beneficios_valor);







        if (data_criacao && numero_cadastro && projeto_id && projeto_nome) {
            let model = await service.
                inserir(beneficios, beneficios_valor, curso_frequenta, data_alteracao, data_criacao, estado_civil, estudou_ate, frequenta_escola, genero, grupo_etnico, idade, nome_completo, outra_fonte_renda, outra_fonte_renda_valor, pne, posicao_familiar, profissao, projeto_id, projeto_nome, renda_principal, renda_principal_valor, situacao_ocupacional, uuid, numero_cadastro, cid, cancer, autismo, gestante, status_online, cadastrador_id);
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
                projeto_id: model[i].projeto_id,
                projeto_nome: model[i].projeto_nome,
                numero_cadastro: model[i].numero_cadastro,
                beneficios: model[i].beneficios,
                beneficios_valor: model[i].beneficios_valor,
                curso_frequenta: model[i].curso_frequenta,
                data_alteracao: model[i].data_alteracao,
                data_criacao: model[i].data_criacao,
                estado_civil: model[i].estado_civil,
                estudou_ate: model[i].estudou_ate,
                frequenta_escola: model[i].frequenta_escola,
                genero: model[i].genero,
                grupo_etnico: model[i].grupo_etnico,
                idade: model[i].idade,
                numero_cadastro: model[i].numero_cadastro,
                nome_completo: model[i].nome_completo,
                outra_fonte_renda: model[i].outra_fonte_renda,
                outra_fonte_renda_valor: model[i].outra_fonte_renda_valor,
                pne: model[i].pne,
                posicao_familiar: model[i].posicao_familia,
                profissao: model[i].profissao,
                projeto_id: model[i].projeto_id,
                projeto_nome: model[i].projeto_nome,
                renda_principal: model[i].renda_principal,
                renda_principal_valor: model[i].renda_principal_valor,
                situacao_ocupacional: model[i].situacao_ocupacional,
                uuid: model[i].uuid,
                cid: model[i].cid,
                cancer: model[i].cancer,
                autismo: model[i].autismo,
                gestante: model[i].gestante,
                status_online: model[i].status_online,
                cpf: model[i].cpf
                // let id_genero = model[i].id_genero
                // let id_posicao = req.body.id_posicao
                // let id_situacao = req.body.id_situacao
                // let id_estado_civil = req.body.id_estado_civil
                // let id_grupo = req.body.id_grupo
                // let id_pne = req.body.pne
                // let id_curso = req.body.id_curso

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
        let beneficios = req.body.beneficios
        let beneficios_valor = req.body.beneficios_valor
        let curso_frequenta = req.body.curso_frequenta
        let data_alteracao = day.toString() + '/' + month.toString() + '/' + year.toString()
        let estado_civil = req.body.estado_civil
        let estudou_ate = req.body.estudou_ate
        let frequenta_escola = req.body.frequenta_escola
        let genero = req.body.genero
        let grupo_etnico = req.body.grupo_etnico
        let idade = req.body.idade
        let nome_completo = req.body.nome_completo
        let outra_fonte_renda = req.body.outra_fonte_renda
        let outra_fonte_renda_valor = req.body.outra_fonte_renda_valor
        let pne = req.body.pne
        let posicao_familiar = req.body.posicao_familia
        let profissao = req.body.profissao
        let renda_principal = req.body.renda_principal
        let renda_principal_valor = req.body.renda_principal_valor
        let situacao_ocupacional = req.body.situacao_ocupacional
        let cid = req.body.cid
        let cancer = req.body.cancer
        let autismo = req.body.autismo
        let gestante = req.body.gestante
        let cadastrador_id = req.body.cadastrador_id
        let status_online = req.body.status_online
        let id_genero = req.body.id_genero
        let id_posicao = req.body.id_posicao
        let id_situacao = req.body.id_situacao
        let id_estado_civil = req.body.id_estado_civil
        let id_grupo = req.body.id_grupo
        let id_pne = req.body.pne
        let id_curso = req.body.id_curso

        function parseCurrency(value) {
            if (typeof value === 'string') {
                // Remove qualquer caractere que não seja número, vírgula, ponto ou traço
                value = value.replace(/[^\d,.-]/g, '').replace(',', '.');
            }
            // Converte para float se o valor ainda for uma string
            return parseFloat(value) || 0; // Retorna 0 caso o valor seja inválido ou vazio
        }
        
        // Aplicando a função de conversão para cada valor
        outra_fonte_renda_valor = parseCurrency(outra_fonte_renda_valor);
        renda_principal_valor = parseCurrency(renda_principal_valor);
        beneficios_valor = parseCurrency(beneficios_valor);

        db_codigo = parseInt(id)

        if (id) {
            await service.atualizar(db_codigo, beneficios, beneficios_valor, curso_frequenta, estado_civil, estudou_ate, frequenta_escola, genero, grupo_etnico, idade, nome_completo, outra_fonte_renda, outra_fonte_renda_valor, pne, posicao_familiar, profissao, renda_principal, renda_principal_valor, situacao_ocupacional, cid, cancer, autismo, gestante, cadastrador_id, status_online, data_alteracao);
            json.result = {
                id,

            };
            console.log(json.result)
        } else {
            json.error = 'Os campos não foram enviados';
        }
        res.json(json);
    },

    deletar: async (req, res) => {
        console.log('deleta')  
        let json = { error: '', result: {} };

        let id = req.params.id;
     
        db_codigo = parseInt(id)

        if (id) {
            await service.deletar(db_codigo);
            json.result = {
                id,

            };
            console.log(json.result)
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

    buscarUmUiid: async (req, res) => {
        let json = { error: '', result: {} };
        //  console.log('buscam um')
        let uuid = req.params.uuid;
        let result = await service.buscarUmUiid(uuid);
        res.json(result);


    },

    buscarUmForm: async (req, res) => {
        let json = { error: '', result: {} };
        //  console.log('buscam um')
        let id = req.params.id;
        let result = await service.buscarUmForm(id);
        res.json(result);


    },


}