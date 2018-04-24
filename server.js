const express = require('express')
const cors = require('cors')
const multipart = require('connect-multiparty')()
const app = express()

app.use(cors())

app.post('/upload', multipart, function (req, res) { 
  res.send(200)
})

console.log('[Express] listening to port 4000')
app.listen(4000)
