'use strict'
const express = require('express')
const router = express.Router()
const controller = require('../controllers/relatorio.controller')

require('dotenv/config')



router.get('/:projeto_id/:tabela', controller.buscarUm)



module.exports = router

