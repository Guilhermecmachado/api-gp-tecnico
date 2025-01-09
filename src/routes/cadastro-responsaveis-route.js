'use strict'
const express = require('express')
const router = express.Router()
const controller = require('../controllers/cadastro-responsaveis-controller')

require('dotenv/config')



router.post('/', controller.inserir)
router.post('/import', controller.inserirImport)
router.get('/', controller.buscarTodos)
router.get('/:id/:numero_cadastro/:tipo_cadastro', controller.buscarUm)
router.post('/:id', controller.atualizar)


module.exports = router

