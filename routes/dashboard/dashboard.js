const express = require('express')
const controller = require('../../controller/dashboard/dashboard')
const verifyToken = require('../../auth/verifyToken')
const router = express.Router()

router.get("/dashboard-user", verifyToken.verifyToken, controller.userDashboardPage);
router.post('/logout', controller.logout)

module.exports = { dashboardRoute : router }