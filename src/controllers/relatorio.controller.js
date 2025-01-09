const service = require('../services/relatorio.service');
module.exports = {


    buscarUm: async (req, res) => {
        let json = { error: '', result: {} };
        let id = req.params.projeto_id;
        let tabela = req.params.tabela; // para pegar o parametro
    
        let result = await service.buscarUm(id, tabela);
    
        // Retornando o resultado em formato de array
        res.json(result);
    },
    



}