const express = require('express');
const controllerHomepage  = require('../controller/homeController');
const controllerPackages = require('../controller/packagesController');
const controllerLogin = require('../controller/loginController');
const controllerUserDashboard = require('../controller/userDashboard');
const rootRoutes = express.Router()

// home page
rootRoutes.get('/',controllerHomepage.getHome)
rootRoutes.get('/about',controllerHomepage.getAbout)
rootRoutes.get('/packet',controllerPackages.getPackages)
rootRoutes.get('/galery',controllerHomepage.getGallery)

// login and register
rootRoutes.get('/login',controllerLogin.loginPage)
rootRoutes.post('/login', controllerLogin.loginSubmit)
rootRoutes.post('/register', controllerLogin.registerSubmit)

// user dashboard
rootRoutes.get('/dashboard',controllerUserDashboard.userDashboardPage)

module.exports ={
    rootRoutes
}