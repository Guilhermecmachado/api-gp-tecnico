'use strict'
const express = require('express')
const router = express.Router()
const controller = require('../controllers/cadastros-controller')

require('dotenv/config')



// router.post('/', controller.inserir)
router.post('/', controller.criaCadadastroInicial)
router.get('/', controller.buscarTodos)
router.get('/:id', controller.buscarUm)
router.get('/numero_cadastro/:numero_cadastro', controller.buscarUmApp)
router.get('/form/:id', controller.buscarUmForm)
router.get('/todosform/:id', controller.buscarTodosForms)
router.get('/:id/:numero_cadastro', controller.buscarUmCadastro)
router.get('/cadastros_dados/:numero_cadastro/:nome_tabela', controller.buscarCadastros)
router.get('/cadastros_dados/cadastrador/:numero_cadastro/:nome_tabela/', controller.buscarCadastrosCadastrador)
router.post('/cadastros_dados/:id/OK', controller.atualizarTabelas)
router.get('/cadastros_dados/:numero_cadastro/:nome_tabela/:tipo_cadastro', controller.buscarCadastrosResponsavel)

router.post('/:id', controller.atualizar)
router.post('/delete/:id', controller.deletar)

router.post('/updateresponsavel/:id/:cpf', controller.atualizarResponsavel)
router.get('/teste/:id', controller.buscarUm)

module.exports = router

