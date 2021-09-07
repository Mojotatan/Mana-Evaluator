const axios = require('axios')
const db = require('./index')
db.sync({force: true})
  .then(() => {
    console.log('db synced, fetching card data')
    // data retrieved from scryfall, see documentation: https://scryfall.com/docs/api
    return axios.get('https://api.scryfall.com/bulk-data/oracle-cards')
  })
  .then(res => (axios.get(res.data.download_uri)))
  .then(res => {
    console.log('card data fetched, updating database')
    return db.models.Card.bulkCreate(res.data.map(card => ({
      id: card.id,
      name: card.name,
      manaCost: card.mana_cost,
      cmc: card.cmc,
      type: card.type_line,
      oracle: card.oracle_text
    })))
  })
  .then(() => {
    console.log('update complete')
    process.exit()
  })
  .catch(err => {
    console.error(err)
    process.exit()
  })