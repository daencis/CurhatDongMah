const express = require('express')
const route = express.Router()
const Controller = require('../controller/controller')
const profileRouter = require('./profileRouter')

// app.get('/', Controller.landingPage)
route.get('/timeline', Controller.allPost)
route.use('/profile', profileRouter)


// app.get('/profile/:id', Controller.findUser)
// app.get('/profile/:id/add', Controller.addPost)
// app.post('/profile/:id/add', Controller.postPost)




module.exports = route