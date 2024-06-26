const express = require('express')
const controller = require('../../../controller/home/form/gallery')
const router = express.Router()

router.get('/', controller.gallery)

module.exports = { galleryForm : router }