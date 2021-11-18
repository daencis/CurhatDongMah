const router = require("express").Router()
const Controller = require('../controller/controller')

router.get('/',  Controller.landingPage)
router.get('/timeline',  Controller.allPost)
router.get('/profile/:id',  Controller.findUser)
router.get('/profile/:id/add',  Controller.addPost)
router.post('/profile/:id/add',  Controller.postPost)

module.exports = router