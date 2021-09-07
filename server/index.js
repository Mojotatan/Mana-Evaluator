const express = require('express')
const path = require('path')
const db = require('../db')

const port = 3000
const app = express()

db.sync()
  .then(() => {
    app.use(express.json())

    app.use(express.static(path.join(__dirname, '../public')))

    app.use('/api', require('./api'))

    app.listen(port, () => {console.log(`Listening on port ${port}...`)})
  })
  .catch(err => {console.error(err)})