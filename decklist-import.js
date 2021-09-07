const fs = require('fs')
const path = require('path')
const util = require('util')
const {Op} = require('sequelize')
const {Card} = require('./db').models
const {drawHand} = require('./utility')

// takes a string in the format of:
// "20 Lightning Bolt
// 20 Black Lotus"
// and returns an array of card objects

let decklist
util.promisify(fs.readFile)(path.resolve(__dirname, './decklists/amulet-titan.txt'), 'utf-8')
  .then(file => {
    decklist = file.split('\n')
    return Promise.all(decklist.map(card => (
      Card.findOne({
        where: {
          name: {
            [Op.eq]: card.split(' ').slice(1).join(' ')
          }
        }
      })
    )))
  })
  .then(cards => {
    let deck = []
    decklist.forEach((card, index) => {
      let quantity = Number(card.split(' ')[0])
      for (let i = 0; i < quantity; i++) {
        deck.push(cards[index])
      }
    })
    // console.log(deck)
    console.log(drawHand(deck))
    process.exit()
  })
  .catch(err => {
    console.error(err)
    process.exit()
  })