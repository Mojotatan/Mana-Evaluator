import React, {useState} from 'react'
import axios from 'axios'

export default () => {
  const [decklist, setDecklist] = useState('')

  const fetchCards = e => {
    e.preventDefault()
    axios.post('/api/import-decklist', {decklist})
    .then(res => {
      console.log(res.data)
    })
    .catch(err => {console.error(err)})
  }

  return (
    <form onSubmit={fetchCards}>
      <textarea value={decklist} onInput={e => {setDecklist(e.target.value)}} />
      <button type='submit'>Import Decklist</button>
    </form>
  )
}