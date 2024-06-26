const express = require('express');
const controller  = require('../../../controller/home/form/packages');
const router = express.Router()

router.get('/',controller.getPackages)

module.exports ={  packagesForm : router }