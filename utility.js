// fisher-yates shuffler
// this function shuffles in place, i.e. the original array is modified
const shuffle = deck => {
  for (let i = 0; i < deck.length; i++) {
    let n = Math.floor(Math.random() * deck.length - i)
    let temp = deck[i]
    deck[i] = deck[n + i]
    deck[n + i] = temp
  }
}

module.exports = {shuffle}