import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState([])
  const [sum, setSum] = useState(0)
  const [avg, setAvg] = useState(0)
  const [pos, setPos] = useState(0)

  const stats = [
    {name: 'Tykkääjät', value: good},
    {name: 'Neutraalit', value: neutral},
    {name: 'Nihkeät', value: bad},
    {name: 'Annetut palautteet', value: all.length},
    {name: 'Palautteiden keskiarvo', value: avg},
    {name: 'Tykänneiden osuus', value: pos}
  ]

  const setValue = rating => {
    let tempGood = good
    let tempNeutral = neutral
    let tempBad = bad
    if(rating===1) tempGood = tempGood + 1
    if(rating===0) tempNeutral = tempNeutral + 1
    if(rating===-1) tempBad = tempBad + 1
    const tempAll = all.concat(rating)
    const tempSum = sum + rating
    const tempAvg = tempSum / tempAll.length
    const tempPos = (tempGood / tempAll.length) * 100
    setGood(tempGood)
    setNeutral(tempNeutral)
    setBad(tempBad)
    setAll(tempAll)
    setSum(tempSum)
    setAvg(tempAvg)
    setPos(tempPos + '%')
  }

  return (
    <div>
      <h1>Anna palautetta</h1>
      <Button handleClick={() => setValue(1)} text="Hyvä" />
      <Button handleClick={() => setValue(0)} text="Ei mielipidettä" />
      <Button handleClick={() => setValue(-1)} text="Huono" />
      <h2>Tilastot:</h2>
      <Statistics stats={stats} totalvotes={all.length}/>
    </div>
  )
}

const Button = (props) => (
  <button onClick = {props.handleClick}>
    {props.text}
  </button>
)

const Statistics = ({stats, totalvotes}) => {
  if (totalvotes === 0) {
    return (
      <div>
        Ääniä ei ole vielä annettu.
      </div>
    )

  }

  return(
  <div>
    <table>
      <tbody>
        <StatisticLine text={stats[0].name} value={stats[0].value} />
        <StatisticLine text={stats[1].name} value={stats[1].value} />
        <StatisticLine text={stats[2].name} value={stats[2].value} />
        <StatisticLine text={stats[3].name} value={stats[3].value} />
        <StatisticLine text={stats[4].name} value={stats[4].value} />
        <StatisticLine text={stats[5].name} value={stats[5].value} />
      </tbody>
    </table>
  </div>
  )
}

const StatisticLine = ({ text, value }) => (
  <tr>
      <td>{text}</td>
      <td>{value}</td>
  </tr>
)

ReactDOM.render(<App />, 
  document.getElementById('root')
)