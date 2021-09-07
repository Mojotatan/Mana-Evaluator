const Sequelize = require('sequelize')
let db = new Sequelize('postgres://localhost:5432/mtg', {
  logging: false
})

db.define('Card', {
  id: {
    type: Sequelize.STRING,
    unique: true,
    primaryKey: true
  },
  name: {type: Sequelize.STRING},
  manaCost: {type: Sequelize.STRING},
  cmc: {type: Sequelize.INTEGER},
  type: {type: Sequelize.STRING},
  oracle: {
    type: Sequelize.TEXT,
    defaultValue: ''
  }
})

module.exports = db