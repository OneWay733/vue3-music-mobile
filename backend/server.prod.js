const express = require('express')
const registerRouter = require('./router')
const cors = require('cors')
const app = express()
const port = 9001
app.use(cors())
registerRouter(app)

app.listen(port, () => {
  console.log(`server is running on port ${port}`)
})
