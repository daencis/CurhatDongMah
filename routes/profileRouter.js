const express = require('express');
const route = express.Router()
const Controller = require('../controller/controller')

route.get('/:id', Controller.findUser)
route.post('/:id/add', Controller.postPost)
route.get('/:id/delete/:postId', Controller.deletePost)

module.exports = route