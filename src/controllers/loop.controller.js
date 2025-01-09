const respservice = require('../services/cadastro-responsaveis-service');
const cadastroService = require('../services/loop.service');

module.exports = {
    atualizar: async (req, res) => {
        let json = { error: '', result: {} };

        try {
            console.log('Iniciando processo de atualização...');

            // Passo 1: Buscar todos os registros da tabela gta_cadastro_responsaveis
            const responsaveis = await respservice.buscarTodos();

            console.log(`Total de registros encontrados: ${responsaveis.length}`);

            // Passo 2: Processar registros em lotes de 100
            const batchSize = 100;
            for (let i = 0; i < responsaveis.length; i += batchSize) {
                const batch = responsaveis.slice(i, i + batchSize);

                console.log(`Processando lote ${i + 1} até ${i + batch.length}...`);

                // Iterar sobre os registros do lote e fazer os updates
                for (const responsavel of batch) {
                    // Preencher o primeiro_responsavel com "PENDENTE" se o nome_completo for inválido
                    const nomeCompleto = responsavel.nome_completo?.trim() || "PENDENTE";

                    const { numero_cadastro, projeto_id, cpf } = responsavel;

                    console.log(`Atualizando registro: numero_cadastro=${numero_cadastro}, projeto_id=${projeto_id}, primeiro_responsavel=${nomeCompleto}, cpf=${cpf}`);

                    // Chamar o serviço para atualizar a tabela gta_cadastros
                    await cadastroService.atualizar({
                        numero_cadastro,
                        projeto_id,
                        nome_completo: nomeCompleto,
                        cpf,
                    });
                }

                console.log(`Lote ${i + 1} até ${i + batch.length} concluído.`);
            }

            console.log('Processo de atualização concluído.');
            json.result = { message: 'Atualização concluída com sucesso!' };
        } catch (error) {
            console.error('Erro durante o processo de atualização:', error);
            json.error = 'Ocorreu um erro ao atualizar os registros.';
        }

        res.json(json);
    }
};
