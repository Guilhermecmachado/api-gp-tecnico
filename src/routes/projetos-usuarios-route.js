'use strict'
const express = require('express')
const router = express.Router()
const controller = require('../controllers/projetos-usuarios-controller')

require('dotenv/config')



router.post('/', controller.inserir)
router.get('/teste/:id', controller.buscarTodos)
router.get('/:id/:projeto_id', controller.buscarUm)
router.post('/:id', controller.atualizar)
router.post('/delete/:id', controller.delete)


module.exports = router

