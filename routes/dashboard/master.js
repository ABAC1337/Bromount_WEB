const express = require('express')
const controller = require('../../controller/dashboard/master')
const router = express.Router()

router.get('/', controller.dashboardMaster)
router.post('/add', controller.adminRegister)
router.post('/delete', controller.deleteAdmin)

module.exports = { masterRoute : router }