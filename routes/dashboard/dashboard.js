const express = require('express')
const controller = require('../../controller/dashboard/dashboard')
const router = express.Router()

router.get("/dashboard-user",controller.userDashboardPage);
router.post('/logout', controller.logout)

module.exports = { dashboardRoute : router }