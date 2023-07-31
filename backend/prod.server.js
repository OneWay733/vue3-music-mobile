const express = require('express')

const registerRouter = require('./router')

const port = process.env.PORT || 9001

const app = express()
const cors = require('cors')

app.use(cors())

registerRouter(app)

app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
})
