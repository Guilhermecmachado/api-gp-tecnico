const service = require('../services/cadastros-service');
const projetoService = require('../services/projetos-service');
const visitaService = require('../services/cadastro-visitas-service');
const controleService = require('../services/cadastro-dados-controle-service')
const responsaveisService = require('../services/cadastro-responsaveis-service')
const familiaService = require('../services/cadastro-demografico-valor-service')
const lazerService = require('../services/cadastro-lazer-service')
const comunitarioService = require('../services/cadastro-esportes-service')
const moradiaService = require('../services/cadastro-ocupacao-service')
const animalService = require('../services/cadastro-animal-service')
const mobilidadeService = require('../services/cadastro-mobilidade-service')
const sustentabilidadeService = require('../services/cadastro-sustentabilidade-service')
const violenciaMariaService = require('../services/cadastro-violencia-maria-service')
const documentoService = require('../services/cadastra-documento-service')





function getCurrentDate() {
    const objectDate = new Date();
    let day = objectDate.getDate();
    let month = objectDate.getMonth() + 1;
    const year = objectDate.getFullYear();

    // Garante dois dígitos para o dia e o mês
    if (day < 10) day = '0' + day;
    if (month < 10) month = '0' + month;

    // Retorna a data formatada
    return `${day}/${month}/${year}`;
}

function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = (Math.random() * 16) | 0; // Número aleatório entre 0 e 15
        const v = c === 'x' ? r : (r & 0x3) | 0x8; // Regra para 'x' ou 'y'
        return v.toString(16); // Converte para hexadecimal
    });
}

function gerarNumeroCadastro(codigo) {
    // Obtém a data atual no formato DD/MM/YYYY
    const dt = new Date().toLocaleDateString('en-ES');
    const d = dt.split('/');

    // Garante que o dia e o mês tenham dois dígitos
    const dia = ('00' + d[1]).slice(-2);
    const mes = ('00' + d[0]).slice(-2);
    const ano = d[2];

    // Gera o UUID ou protocolo
    const uuid = generateUUID();

    // Monta o número de cadastro
    let numeroCadastro = `${codigo}-${ano}${mes}${dia}-${uuid.substring(0, 6).toUpperCase()}`;

    return numeroCadastro;
}

module.exports = {

    criaCadadastroInicial: async (req, res, next) => {

        let json = { error: '', result: {} };

        console.log(req.body)

        //recupera dados projeto
        let projeto = await projetoService.buscarUm(req.body.cadastro_projeto_id)

        console.log(projeto)

        //cria cadastro
        let data_criacao = getCurrentDate()
        let cadastro_id = req.body.cadastro_cadastrador_id
        let cadastro_nome = req.body.cadastro_cadastrador_nome
        let numero_cadastro = gerarNumeroCadastro(projeto.codigo)
        let primeiro_responsavel = req.body.cadastro_primeiro_responsavel
        let projeto_codigo = projeto.codigo
        let projeto_id = projeto.id
        let projeto_nome = projeto.nome_projeto
        let status = req.body.cadastro_status
        let status_online = req.body.cadastro_status

        try {
            if (numero_cadastro && projeto_codigo && projeto_id && projeto_nome) {
                const model = await service.inserir(
                    cadastro_id,
                    cadastro_nome,
                    data_criacao,
                    numero_cadastro,
                    primeiro_responsavel,
                    projeto_codigo,
                    projeto_id,
                    projeto_nome,
                    status,
                    status_online
                );

                let visita_cadastrador = req.body.visita_cadastrador
                let visita_data_criacao = getCurrentDate()
                let visita_data = req.body.visita_data
                let visita_numero_cadastro = numero_cadastro
                let visita_hora = req.body.visita_hora
                let visita_status = req.body.visita_status

                let visita = await visitaService.inserir(
                    visita_cadastrador,
                    visita_data_criacao,
                    visita_data,
                    visita_data_criacao,
                    visita_numero_cadastro,
                    '',
                    visita_hora,
                    projeto_id,
                    projeto_nome,
                    visita_status,
                    cadastro_id,
                    ''
                )

                console.log(visita)

                // Define o resultado na resposta JSON
                json.result = {
                    id: model,
                };
                res.json(json);
            } else {
                json.error = 'Campos não enviados';
                res.json(json);
            }
        } catch (error) {
            // Captura e trata o erro
            console.error('Erro ao inserir os dados:', error);
            json.error = 'Ocorreu um erro ao processar a requisição.';
            res.json(json);
        }

    },

    inserir: async (req, res) => {
        let objectDate = new Date();


        let day = objectDate.getDate();

        let month = objectDate.getMonth() + 1;

        let year = objectDate.getFullYear();

        if (day < 10) day = '0' + day;
        if (month < 10) month = '0' + month;
        let json = { error: '', result: {} };
        console.log('insert')
        let cadastro_id = req.body.cadastrador_id
        let cadastro_nome = req.body.cadastrador_nome
        let data_criacao = day.toString() + '/' + month.toString() + '/' + year.toString()
        let numero_cadastro = req.body.numero_cadastro
        let primeiro_responsavel = req.body.primeiro_responsavel
        let projeto_codigo = req.body.projeto_codigo
        let projeto_id = req.body.projeto_id
        let projeto_nome = req.body.projeto_nome
        let status = req.body.status
        let status_online = req.body.status_online


        if (numero_cadastro && projeto_codigo && projeto_id && projeto_nome) {
            let model = await service.
                inserir(cadastro_id, cadastro_nome, data_criacao, numero_cadastro, primeiro_responsavel, projeto_codigo, projeto_id, projeto_nome, status, status_online);
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
                numero_cadastro: model[i].numero_cadastro,
                cadastrador_nome: model[i].cadastrador_nome,
                data_criacao: model[i].data_criacao,
                primeiro_responsavel: model[i].primeiro_responsavel,
                cadastrador_id: model[i].cadastrador_id,
                projeto_codigo: model[i].projeto_codigo,
                projeto_id: model[i].projeto_id,
                projeto_nome: model[i].projeto_nome,
                status: model[i].status,
                status_online: model[i].status_online,
                cpf: model[i].cpf

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
        let cadastro_id = req.body.cadastrador_id
        let cadastro_nome = req.body.cadastrador_nome
        let data_alteracao = day.toString() + '/' + month.toString() + '/' + year.toString()
        let numero_cadastro = req.body.numero_cadastro
        let primeiro_responsavel = req.body.primeiro_responsavel
        let projeto_codigo = req.body.projeto_codigo
        let projeto_id = req.body.projeto_id
        let projeto_nome = req.body.projeto_nome
        let status = req.body.status
        let status_online = req.body.status_online

        db_codigo = parseInt(id)

        if (id) {
            await service.atualizar(db_codigo, cadastro_id, cadastro_nome, data_alteracao, numero_cadastro, primeiro_responsavel, projeto_codigo, projeto_id, projeto_nome, status, status_online);
            json.result = {
                id,

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

    atualizarResponsavel: async (req, res) => {
        console.log('atualiza')


        let json = { error: '', result: {} };

        let id = req.body.id;

        let primeiro_responsavel = req.body.primeiro_responsavel

        let cpf = req.params.cpf

        db_codigo = parseInt(id)

        if (id) {
            await service.atualizarResponsavel(db_codigo, primeiro_responsavel, cpf);
            json.result = {
                id,

            };
        } else {
            json.error = 'Os campos não foram enviados';
        }
        res.json(json);
    },


    buscarUmCadastro: async (req, res) => {
        let json = { error: '', result: {} };
        //  console.log('buscam um')
        let id = req.params.id;
        let numero_cadastro = req.params.numero_cadastro //para pegar o parametro
        let result = await service.buscarUmCadastro(id, numero_cadastro);
        res.json(result);


    },

    buscarCadastros: async (req, res) => {
        let json = { error: '', result: {} };
        //  console.log('buscam um')
        let nome_tabela = req.params.nome_tabela;
        let numero_cadastro = req.params.numero_cadastro
        //para pegar o parametro
        let result = await service.buscarCadastros(nome_tabela, numero_cadastro);
        res.json(result);


    },

    buscarCadastrosCadastrador: async (req, res) => {
        let json = { error: '', result: {} };
        //  console.log('buscam um')
        let nome_tabela = req.params.nome_tabela;
        let numero_cadastro = req.params.numero_cadastro
        //para pegar o parametro
        let result = await service.buscarCadastrosCadastrador(nome_tabela, numero_cadastro);
        res.json(result);


    },

    buscarCadastrosResponsavel: async (req, res) => {
        let json = { error: '', result: {} };
        // console.log('buscam um')
        let nome_tabela = req.params.nome_tabela;
        let numero_cadastro = req.params.numero_cadastro
        let tipo_cadastro = req.params.tipo_cadastro
        //para pegar o parametro
        let result = await service.buscarCadastrosResponsavel(nome_tabela, numero_cadastro, tipo_cadastro);
        // console.log(result)
        res.json(result);


    },

    buscarUm: async (req, res) => {
        let json = { error: '', result: {} };
        //  console.log('buscam um')
        let id = req.params.id;
        let id_number = parseInt(id)
        let codigo = req.params.id
        //para pegar o parametro
        let result = await service.buscarUm(codigo);
        res.json(result);


    },

    buscarUmApp: async (req, res) => {
        let json = { error: '', result: {} };
        //  console.log('buscam um')
        let numero_cadastro = req.params.numero_cadastro;

        //para pegar o parametro
        let result = await service.buscarUmApp(numero_cadastro);
        res.json(result);


    },

    buscarUmForm: async (req, res) => {
        let json = { error: '', result: {} };
        //  console.log('buscam um')
        let id = req.params.id;
        let id_number = parseInt(id)
        //para pegar o parametro
        let result = await service.buscarUmForm(id_number);
        res.json(result);


    },



    atualizarTabelas: async (req, res) => {
        console.log('atualiza')




        let json = { error: '', result: {} };

        let id = req.params.id;
        let cadastrador_id = req.body.cadastrador_id
        let nome_tabela = req.body.nome_tabela
        let status_online = 'OK'


        db_codigo = parseInt(id)

        if (id) {
            await service.atualizarTabelas(db_codigo, nome_tabela, cadastrador_id, status_online);
            json.result = {
                id,

            };

        } else {
            json.error = 'Os campos não foram enviados';
        }
        res.json(json);
    },


    buscarTodosForms: async (req, res) => {
        let json = { error: '', result: {} };
        //  console.log('buscam um')
        let id = req.params.id;
        let id_number = parseInt(id)
        //para pegar o parametro
        let result = await service.buscarUmForm(id_number);

        let rescontrole = await controleService.buscarUm(result.projeto_id, result.numero_cadastro)
        let resresponsavel1 = await responsaveisService.buscarUm(result.projeto_id, result.numero_cadastro, 'primeiroResponsavel')
        let resresponsavel2 = await responsaveisService.buscarUm(result.projeto_id, result.numero_cadastro, 'segundoResponsavel')
        let despesas = await familiaService.buscarUm(result.projeto_id, result.numero_cadastro)
        let lazer = await lazerService.buscarUm(result.projeto_id, result.numero_cadastro)
        let comunitario = await comunitarioService.buscarUm(result.projeto_id, result.numero_cadastro)
        let moradia = await moradiaService.buscarUm(result.projeto_id, result.numero_cadastro)
        let animal = await animalService.buscarUm(result.projeto_id, result.numero_cadastro)
        let mobilidade = await mobilidadeService.buscarUm(result.projeto_id, result.numero_cadastro)
        let sustentabilidade = await sustentabilidadeService.buscarUm(result.projeto_id, result.numero_cadastro)
        let maria = await violenciaMariaService.buscarUm(result.projeto_id, result.numero_cadastro)
        let documento = await documentoService.buscarUm(result.projeto_id, result.numero_cadastro)


        json.result = {
            'obj_controle': rescontrole,
            'obj_responsaveis1': resresponsavel1,
            'obj_responsaveis2': resresponsavel2,
            'obj_despesas':despesas,
            'obj_lazer':lazer,
            'obj_comunitario':comunitario,
            'obj_moradia': moradia,
            'obj_animal':animal,
            'obj_mobilidade':mobilidade,
            'obj_sustentabilidade':sustentabilidade,
            'obj_maria':maria,
            'obj_documento':documento
        }

        res.json(json.result);


    },



}