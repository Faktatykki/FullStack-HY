import React, { useState } from 'react'

const StatisticLine = ({text, value}) =>  {
  return (
      <tr><td>{text}</td>
        <td>{value}</td>
      </tr>
  )
}


const Button = ({ handleClick, text }) => <button onClick = {handleClick}>{text}</button>

const Statistics = (props) => {

  if (props.all > 0) {
    return (
      <div>
      <table>
        <tbody>  
          <StatisticLine text = 'good' value = {props.good}/>
          <StatisticLine text = 'neutral' value = {props.neutral}/>
          <StatisticLine text = 'bad' value = {props.bad}/>
          <StatisticLine text = 'all' value = {props.all}/>
          <StatisticLine text = 'average' value = {props.average}/>          
          <StatisticLine text = 'positive' value = {props.positive + '%'}/>
        </tbody>
      </table>
      </div>
    )
  } else {
    return (
      <p>No feedback given</p>
    )
  }
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseByOneGood = () => setGood(good + 1)
  const increaseByOneNeutral = () => setNeutral(neutral + 1)
  const increaseByOneBad = () => setBad(bad + 1)

  const all = good + neutral + bad
  const average = (good + bad * -1) / all
  const positive = (good / all) * 100.0

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={increaseByOneGood} text = 'good'/>
      <Button handleClick={increaseByOneNeutral} text = 'neutral'/>
      <Button handleClick={increaseByOneBad} text = 'bad'/>
      <h1>statistics</h1>
      <Statistics good = {good} neutral = {neutral} bad = {bad}
                  all = {all} average = {average} positive = {positive}/>
    </div>
  )
}



export default App
