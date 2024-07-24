const express = require('express')
const controller = require('../../controller/dashboard/admin')
const { uploadMiddleware } = require('../../middleware/multer')
const router = express.Router()


router.get('/', controller.dashboardAdmin)
router.post('/create',uploadMiddleware.single('foto') ,controller.create)
router.post('/Update',uploadMiddleware.single('foto') ,controller.edit)
router.post('/delete',controller.remove)
module.exports = { adminRoute: router }