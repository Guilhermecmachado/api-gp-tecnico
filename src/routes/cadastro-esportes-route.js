'use strict'
const express = require('express')
const router = express.Router()
const controller = require('../controllers/cadastro-esportes-controller')

require('dotenv/config')



router.post('/', controller.inserir)
router.get('/', controller.buscarTodos)
router.get('/:id/:numero_cadastro', controller.buscarUm)
router.post('/:id', controller.atualizar)


module.exports = router

