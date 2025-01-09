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
function formatarDataAtual() {
  const objectDate = new Date();

  const day = objectDate.getDate().toString().padStart(2, '0');
  const month = (objectDate.getMonth() + 1).toString().padStart(2, '0');
  const year = objectDate.getFullYear();

  return `${day}/${month}/${year}`;
}

async function handleControle(dados_controle, projeto_id, numero_cadastro, projeto_nome) {
  const data_alteracao = formatarDataAtual();
  if (!dados_controle) return;

  const existe = await controleService.buscarUm(projeto_id, numero_cadastro);
  if (existe) {
    await controleService.atualizar(existe.id, {
      ...dados_controle,
      data_alteracao,
    });
  } else {
    await controleService.inserir({
      ...dados_controle,
      projeto_id,
      projeto_nome,
      numero_cadastro,
      data_criacao: formatarDataAtual(),
    });
  }
}

async function handleResponsavel(dados_responsavel, projeto_id, numero_cadastro, projeto_nome, tipoResponsavel) {
  const data_alteracao = formatarDataAtual();
  if (!dados_responsavel) return;

  const existe = await responsaveisService.buscarUm(projeto_id, numero_cadastro, tipoResponsavel);
  if (existe) {
    await responsaveisService.atualizar(existe.id,{
      ...dados_responsavel,
      data_alteracao,
    });
  } else {
    await responsaveisService.inserir({
      ...dados_responsavel,
      projeto_id,
      projeto_nome,
      numero_cadastro,
      data_criacao: formatarDataAtual(),
    });
  }
}

async function handleDespesas(dados_despesas, projeto_id, numero_cadastro, projeto_nome) {
  const data_alteracao = formatarDataAtual();
  if (!dados_despesas) return;

  const existe = await familiaService.buscarUm(projeto_id, numero_cadastro);
  if (existe) {
    await familiaService.atualizar(existe.id,{
      ...dados_despesas,
      data_alteracao,
    });
  } else {
    await familiaService.inserir({
      ...dados_despesas,
      projeto_id,
      projeto_nome,
      numero_cadastro,
      data_criacao: formatarDataAtual(),
    });
  }
}

async function handleLazer(dados_lazer, projeto_id, numero_cadastro, projeto_nome) {
  const data_alteracao = formatarDataAtual();
  if (!dados_lazer) return;

  const existe = await lazerService.buscarUm(projeto_id, numero_cadastro);
  if (existe) {
    await lazerService.atualizar(existe.id, { ...dados_lazer, data_alteracao });
  } else {
    await lazerService.inserir({
      ...dados_lazer,
      projeto_id,
      projeto_nome,
      numero_cadastro,
      data_criacao: formatarDataAtual(),
    });
  }
}

async function handleComunitario(dados_comunitario, projeto_id, numero_cadastro, projeto_nome) {
  const data_alteracao = formatarDataAtual();
  if (!dados_comunitario) return;

  const existe = await comunitarioService.buscarUm(projeto_id, numero_cadastro);
  if (existe) {
    await comunitarioService.atualizar(existe.id, { ...dados_comunitario, data_alteracao });
  } else {
    await comunitarioService.inserir({
      ...dados_comunitario,
      projeto_id,
      projeto_nome,
      numero_cadastro,
      data_criacao: formatarDataAtual(),
    });
  }
}

async function handleMoradia(dados_moradia, projeto_id, numero_cadastro, projeto_nome) {
  const data_alteracao = formatarDataAtual();
  if (!dados_moradia) return;

  const existe = await moradiaService.buscarUm(projeto_id, numero_cadastro);
  if (existe) {
    await moradiaService.atualizar(existe.id, { ...dados_moradia, data_alteracao });
  } else {
    await moradiaService.inserir({
      ...dados_moradia,
      projeto_id,
      projeto_nome,
      numero_cadastro,
      data_criacao: formatarDataAtual(),
    });
  }
}

async function handleAnimais(dados_animais, projeto_id, numero_cadastro, projeto_nome) {
  const data_alteracao = formatarDataAtual();
  if (!dados_animais) return;

  const existe = await animalService.buscarUm(projeto_id, numero_cadastro);
  if (existe) {
    await animalService.atualizar(existe.id, { ...dados_animais, data_alteracao });
  } else {
    await animalService.inserir({
      ...dados_animais,
      projeto_id,
      projeto_nome,
      numero_cadastro,
      data_criacao: formatarDataAtual(),
    });
  }
}

async function handleMobilidade(dados_mobilidade, projeto_id, numero_cadastro, projeto_nome) {
  const data_alteracao = formatarDataAtual();
  if (!dados_mobilidade) return;

  const existe = await mobilidadeService.buscarUm(projeto_id, numero_cadastro);
  if (existe) {
    await mobilidadeService.atualizar(existe.id, { ...dados_mobilidade, data_alteracao });
  } else {
    await mobilidadeService.inserir({
      ...dados_mobilidade,
      projeto_id,
      projeto_nome,
      numero_cadastro,
      data_criacao: formatarDataAtual(),
    });
  }
}

async function handleSustentabilidade(dados_sustentabilidade, projeto_id, numero_cadastro, projeto_nome) {
  const data_alteracao = formatarDataAtual();
  if (!dados_sustentabilidade) return;

  const existe = await sustentabilidadeService.buscarUm(projeto_id, numero_cadastro);
  if (existe) {
    await sustentabilidadeService.atualizar(existe.id, { ...dados_sustentabilidade, data_alteracao });
  } else {
    await sustentabilidadeService.inserir({
      ...dados_sustentabilidade,
      projeto_id,
      projeto_nome,
      numero_cadastro,
      data_criacao: formatarDataAtual(),
    });
  }
}

async function handleMaria(dados_maria, projeto_id, numero_cadastro, projeto_nome) {
  const data_alteracao = formatarDataAtual();
  if (!dados_maria) return;

  const existe = await violenciaMariaService.buscarUm(projeto_id, numero_cadastro);
  if (existe) {
    await violenciaMariaService.atualizar(existe.id, { ...dados_maria, data_alteracao });
  } else {
    await violenciaMariaService.inserir({
      ...dados_maria,
      projeto_id,
      projeto_nome,
      numero_cadastro,
      data_criacao: formatarDataAtual(),
    });
  }
}

async function handleDocumento(dados_documento, projeto_id, numero_cadastro, projeto_nome) {
  const data_alteracao = formatarDataAtual();
  if (!dados_documento) return;

  const existe = await documentoService.buscarUm(projeto_id, numero_cadastro);
  if (existe) {
    await documentoService.atualizar(existe.id, { ...dados_documento, data_alteracao });
  } else {
    await documentoService.inserir({
      ...dados_documento,
      projeto_id,
      projeto_nome,
      numero_cadastro,
      data_criacao: formatarDataAtual(),
    });
  }
}

module.exports = {
  createOrUpdate: async (req, res) => {
    const { dados, projeto_id, numero_cadastro, projeto_nome } = req.body;
    if (!dados || !projeto_id || !numero_cadastro || !projeto_nome) {
      return res.status(400).json({ error: 'Dados incompletos' });
    }

    try {
      // Processar cada um dos conjuntos de dados com tratamento de erro específico
      try {
        await handleControle(dados.dados_controle, projeto_id, numero_cadastro, projeto_nome);
      } catch (error) {
        return res.status(500).json({ error: 'Erro ao salvar dados de controle', details: error.message });
      }

      try {
        await handleResponsavel(dados.dados_responsavel1, projeto_id, numero_cadastro, projeto_nome, 'primeiroResponsavel');
      } catch (error) {
        return res.status(500).json({ error: 'Erro ao salvar o primeiro responsável', details: error.message });
      }

      try {
        await handleResponsavel(dados.dados_responsavel2, projeto_id, numero_cadastro, projeto_nome, 'segundoResponsavel');
      } catch (error) {
        return res.status(500).json({ error: 'Erro ao salvar o segundo responsável', details: error.message });
      }

      try {
        await handleDespesas(dados.dados_despesas, projeto_id, numero_cadastro, projeto_nome);
      } catch (error) {
        return res.status(500).json({ error: 'Erro ao salvar dados de despesas', details: error.message });
      }

      try {
        await handleLazer(dados.dados_lazer, projeto_id, numero_cadastro, projeto_nome);
      } catch (error) {
        return res.status(500).json({ error: 'Erro ao salvar dados de lazer', details: error.message });
      }

      try {
        await handleComunitario(dados.dados_comunitario, projeto_id, numero_cadastro, projeto_nome);
      } catch (error) {
        return res.status(500).json({ error: 'Erro ao salvar dados comunitários', details: error.message });
      }

      try {
        await handleMoradia(dados.dados_moradia, projeto_id, numero_cadastro, projeto_nome);
      } catch (error) {
        return res.status(500).json({ error: 'Erro ao salvar dados de moradia', details: error.message });
      }

      try {
        await handleAnimais(dados.dados_animais, projeto_id, numero_cadastro, projeto_nome);
      } catch (error) {
        return res.status(500).json({ error: 'Erro ao salvar dados de animais', details: error.message });
      }

      try {
        await handleMobilidade(dados.dados_mobilidade, projeto_id, numero_cadastro, projeto_nome);
      } catch (error) {
        return res.status(500).json({ error: 'Erro ao salvar dados de mobilidade', details: error.message });
      }

      try {
        await handleSustentabilidade(dados.dados_sustentabilidade, projeto_id, numero_cadastro, projeto_nome);
      } catch (error) {
        return res.status(500).json({ error: 'Erro ao salvar dados de sustentabilidade', details: error.message });
      }

      try {
        await handleMaria(dados.dados_maria, projeto_id, numero_cadastro, projeto_nome);
      } catch (error) {
        return res.status(500).json({ error: 'Erro ao salvar dados de violência Maria', details: error.message });
      }

      try {
        await handleDocumento(dados.dados_documento, projeto_id, numero_cadastro, projeto_nome);
      } catch (error) {
        return res.status(500).json({ error: 'Erro ao salvar documentos', details: error.message });
      }

      res.status(200).json({ success: true });
    } catch (error) {
      console.error('Erro inesperado:', error);
      res.status(500).json({ error: 'Erro interno no servidor', details: error.message });
    }
  },
};





