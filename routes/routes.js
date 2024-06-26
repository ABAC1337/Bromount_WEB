const express = require('express');
const rootRoutes = express.Router()

const {homeRoute} = require('./home/homePage')
const {loginRoute} = require('./user/login_register')
const {dashboardRoute} = require('./dashboard/dashboard')

const {verifySession} = require('../auth/verifySession')

// home
rootRoutes.use('/',homeRoute)
// login and register
rootRoutes.use('/login',loginRoute)
// user dashboard
rootRoutes.use('/dashboard',verifySession, dashboardRoute)

module.exports ={
    rootRoutes
}