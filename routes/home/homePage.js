const express =require('express')
const controller = require('../../controller/home/homePage')
const router = express.Router()

const {galleryForm} = require('./form/gallery')
const {aboutForm} = require('./form/about')
const {packagesForm} = require('./form/packages')

router.get('/',controller.homepage)
router.use('/gallery',galleryForm)
router.use('/about',aboutForm)
router.use('/packages',packagesForm)

module.exports = { homeRoute : router }