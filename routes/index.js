const express = require('express')
const route = express.Router()
const Controller = require('../controller/controller')
const profileRouter = require('./profileRouter')
const timeline = require('./timeline')

route.get('/', Controller.landingPage)

route.get('/test', (req, res)=>{
    res.render('test.ejs')
})

route.get('/login', Controller.login)
route.post('/login', Controller.checkLogin)

route.get('/register', Controller.register)
route.post('/register', Controller.postRegister)

route.use('/timeline', timeline)
route.use('/profile', profileRouter)

module.exports = route