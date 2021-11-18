const express = require('express')
const route = express.Router()
const Controller = require('../controller/controller')
const profileRouter = require('./profileRouter')
const timeline = require('./timeline')

route.get('/', Controller.landingPage)

route.get('/login', Controller.login)
route.post('/login', Controller.checkLogin)

route.get('/register', Controller.register)
route.post('/register', Controller.postRegister)

route.use(function(req, res, next) {
    if(req.session.userId){
        next()
    }else{
        const error = "Login dulu dong, kan mau curhat"
        res.redirect(`/login?err=${error}`)
    }
})

route.use('/timeline', timeline)
route.use('/profile', profileRouter)

module.exports = route