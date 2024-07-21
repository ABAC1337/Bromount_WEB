const express = require('express')
const controller = require('../../controller/user/login_register')
const router = express.Router()

router.get('/', controller.loginPage)
router.post('/', controller.loginSubmit)
router.post('/register', controller.registerSubmit)


module.exports = { loginRoute : router }