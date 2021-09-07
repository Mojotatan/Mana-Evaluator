const express = require('express')
const path = require('path')
const db = require('../db')

const port = 3000
const app = express()

db.sync()
  .then(() => {
    app.use(express.static(path.join(__dirname, '../public')))
    app.listen(port, () => {console.log(`Listening on port ${port}...`)})
  })
  .catch(err => {console.error(err)})