'use strict'

const express = require('express')
const router = express.Router()

const controller = require('../controllers/gerar-pdf-controller')

router.post('/', controller.get)

module.exports = router

