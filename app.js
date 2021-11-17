const express = require('express')
const Controller = require('./controller/controller')
const app = express()
const port = 3000

app.get('/',  Controller.landingPage)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})