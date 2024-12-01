import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Uint8Array(anecdotes.length))
  const [max, setMax] = useState(0)

  const handleSelect = () => {
    const updatedSelected = Math.floor(Math.random() * anecdotes.length)
    console.log(updatedSelected)
    setSelected(updatedSelected)
    console.log('points', points)
    console.log('max', max)
  }

  const handleVote = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
    console.log('selected points', copy[selected])
    console.log('max', max)
    if (points[selected] >= points[max]) {
      const updatedMax = selected
      setMax(updatedMax)
      console.log('updated max', updatedMax)
    }
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}<br/>
      has {points[selected]} votes<br/>
      <button onClick={handleVote}>vote</button>
      <button onClick={handleSelect}>next anecdote</button>
      <h1>Anecdote with most votes</h1>
      {anecdotes[max]}<br/>
    </div>
  )
 }

export default App