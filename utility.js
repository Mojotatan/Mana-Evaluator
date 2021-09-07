// fisher-yates shuffler
// this function shuffles in place, i.e. the original array is modified
function shuffle(deck) {
  for (let i = 0; i < deck.length; i++) {
    let n = Math.floor(Math.random() * deck.length - i)
    let temp = deck[i]
    deck[i] = deck[n + i]
    deck[n + i] = temp
  }
}

function drawHand(deck) {
  shuffle(deck)
  return prettifyCards(deck.slice(0, 7))
}

function prettifyCards(cards) {
  return cards.map(card => {
    let text = card.name
    if (card.manaCost) text += ` (${card.manaCost.replace(/{|}/g, '')})`
    return text
  })
}

module.exports = {shuffle, drawHand, prettifyCards}