const dotenv = require('dotenv');
const express = require('express');
const db = require('./database');
const hbs = require('hbs');
const path = require('path')
const {rootRoutes}= require('./routes/routes');
const cookieParser = require("cookie-parser");
const session = require('express-session');

dotenv.config({ path: path.join(__dirname, './environment/.env') });
const server = express()
const publcpath = path.join(__dirname,'./public')
const viewspath = path.join(__dirname, "./template/views")
const partialpath = path.join(__dirname, './template/partials')

server.set('view engine', 'hbs')
server.set('views',viewspath)
hbs.registerPartials(partialpath)

server.use(express.json())
server.use(express.urlencoded({ extended: false }))
server.use(cookieParser())

server.use(session({
    secret: 'bromount', // Replace with a strong secret for session encryption
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Set secure to true if using HTTPS
}));

server.use(express.static(publcpath))


server.use(rootRoutes);


db.connect().then(() => {
    server.listen(process.env.PORT)
    console.log(`Server running on http://localhost:${process.env.PORT}`)
})