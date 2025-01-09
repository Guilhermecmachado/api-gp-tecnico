'use strict'
const express = require('express')
const router = express.Router()
const controller = require('../controllers/cria-tudo-controller')

require('dotenv/config')



router.post('/', controller.createOrUpdate)



module.exports = router

