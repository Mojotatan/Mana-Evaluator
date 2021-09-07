const {Op} = require('sequelize')
const {Card} = require('../db').models

const api = module.exports = require('express').Router()

api.post('/import-decklist', (req, res) => {
  let decklist = req.body.decklist.split('\n')
  Promise.all(decklist.map(card => (
    Card.findOne({
      where: {
        name: {
          [Op.eq]: card.split(' ').slice(1).join(' ')
        }
      }
    })
  )))
  .then(cards => {
    let deck = []
    decklist.forEach((card, index) => {
      let quantity = Number(card.split(' ')[0])
      for (let i = 0; i < quantity; i++) {
        deck.push(cards[index])
      }
    })
    res.send({deck})
  })
  .catch(err => {
    console.error(err)
    res.status(500).send({err})
  })
})

api.use((req, res) => res.status(404).end())