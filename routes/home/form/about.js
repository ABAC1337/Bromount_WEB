const express = require('express')
const { about } = require('../../../controller/home/form/about')

const router = express.Router()

router.get('/', about)

module.exports = { aboutForm : router }