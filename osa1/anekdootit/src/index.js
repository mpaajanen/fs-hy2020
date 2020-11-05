import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState([0, 0, 0, 0, 0, 0])

  const setValue = max => {
    const r = Math.floor(Math.random() * Math.floor(max))
    console.log(r, votes)
    setSelected(r)
  }

  const setVote = sel => {
    const copy = [...votes]
    copy[sel] += 1
    setVotes(copy)
  }

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <Button handleClick = {() => setValue(anecdotes.length)} text="next anecdote" /><br />
      {props.anecdotes[selected]}<br />
      has {votes[selected]} votes<br />
      <Button handleClick = {() => setVote(selected)} text="vote" />
      <Mostvotes anecdotes={anecdotes} votes={votes} />
    </div>
  )
}

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Mostvotes  = ( {anecdotes, votes} ) => {
  const most = votes.indexOf(Math.max(...votes))
  return (
    <div>
      <h2>Anecdote with most votes</h2>
      {anecdotes[most]}<br />
      has {votes[most]} votes
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)