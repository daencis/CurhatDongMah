const express = require('express');
const route = express.Router()
const Controller = require('../controller/controller')

route.get('/', Controller.allPost)
route.get('/update/:postId/like', Controller.updateLike)
route.get('/update/:postId/dislike', Controller.updateDislike)

module.exports = route