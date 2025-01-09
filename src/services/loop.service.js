
const db = require('../../db');


module.exports = {
  
    async  atualizar({ numero_cadastro, projeto_id, nome_completo, cpf }) {
        const query = `
            UPDATE gta_cadastros
            SET primeiro_responsavel = ?, cpf = ?
            WHERE numero_cadastro = ? AND projeto_id = ?
        `;
    
        await db.query(query, [nome_completo, cpf, numero_cadastro, projeto_id]);
    }
    
    
   
}