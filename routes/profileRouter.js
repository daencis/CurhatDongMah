const express = require('express');
const route = express.Router()
const Controller = require('../controller/controller')

route.get('/:id', Controller.findUser)
// route.get('/:id/add', Controller.addPost)
route.post('/:id/add', Controller.postPost)
route.get('/:id/delete/:postId', Controller.deletePost)

// route.get('/', Controller.showIncubators)
// route.get('/add', Controller.showFormAddIncubator)
// route.post('/add', Controller.addIncubator)
// route.get('/:incubatorId', Controller.showIncubator)

// route.get('/:incubatorId/startUp/add', Controller.showFormAddStartUp)
// route.post('/:incubatorId/startUp/add', Controller.addStartUp)

// route.get('/:incubatorId/startUp/:startUpId/delete', Controller.deleteStartUp)
// route.get('/:incubatorId/startUp/:startUpId/edit', Controller.showFormEditStartUp)
// route.post('/:incubatorId/startUp/:startUpId/edit', Controller.editStartUp)


module.exports = route