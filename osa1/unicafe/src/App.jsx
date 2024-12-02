import { useState } from 'react'

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td><td>{props.value}{props.extension}</td>
    </tr>
  )
}

const Statistics = (props) => {
  if (props.total === 0) {
    return (
      <div>
        No feedback given<br/>
      </div>
    )
  }
  return (
    <table>
        <tbody>
        <StatisticLine text="good" value={props.good} />
        <StatisticLine text="neutral" value={props.neutral} />
        <StatisticLine text="bad" value={props.bad} />
        <StatisticLine text="all" value={props.total} />
        <StatisticLine text="avg" value={props.avg / props.total} />
        <StatisticLine text="positive" value={100 * props.good / props.total} extension="%" />
      </tbody>
    </table>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [bad, setBad] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [total, setAll] = useState(0)
  const [avg, setAvg] = useState(0)
  
  const handleGood = () => {
    const updatedGood = good + 1
    const updatedTotal = total + 1
    const updatedAvg = avg + 1
    setGood(updatedGood)
    setAll(updatedTotal)
    setAvg(updatedAvg)
  }

  const handleBad = () => {
    const updatedBad = bad + 1
    const updatedTotal = total + 1
    const updatedAvg = avg - 1
    setBad(updatedBad)
    setAll(total + 1)
    setAvg(updatedAvg)
  }

  const handleNeutral = () => {
    const updatedNeutral = neutral + 1
    const updatedTotal = total + 1
    const updatedAvg = avg
    setNeutral(updatedNeutral)
    setAll(total + 1)
    setAvg(updatedAvg)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGood} text="good" />
      <Button handleClick={handleNeutral} text="neutral" />      
      <Button handleClick={handleBad} text="bad" />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} total={total} avg={avg} />
    </div>
  )
}
export default App