'use strict'
const express = require('express')
const router = express.Router()
const controller = require('../controllers/projetos-controller')

require('dotenv/config')



router.post('/', controller.inserir)
router.get('/', controller.buscarTodos)
router.get('/porusuario/:id', controller.buscarTodosUsuario)
router.get('/:id', controller.buscarUm)
router.post('/:id', controller.atualizar)
router.post('/delete/:id', controller.deletar)


module.exports = router

