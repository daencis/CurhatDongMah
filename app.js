const express = require('express')
const Controller = require('./controller/controller')
const app = express()
const port = 3000
const router = require('./routes/index.js')

app.set('view-engine', 'ejs')
app.use(express.urlencoded({extended:true}))

app.use(router)

// app.get('/', Controller.landingPage)
// app.get('/timeline', Controller.allPost)
// app.get('/profile/:id', Controller.findUser)
// app.get('/profile/:id/add', Controller.addPost)
// app.post('/profile/:id/add', Controller.postPost)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})