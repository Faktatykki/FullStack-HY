import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'
import Statistics from './components/Statistics'

const store = createStore(reducer)

const App = () => {

  return (
    <div>
      <h1>Give feedback</h1>
      <button onClick = {a => store.dispatch({ type: 'GOOD' })}>good</button> 
      <button onClick = {a => store.dispatch({ type: 'OK' })}>neutral</button> 
      <button onClick = {a => store.dispatch({ type: 'BAD' })}>bad</button>
      <button onClick = {a => store.dispatch({ type: 'ZERO' })}>reset stats</button>
      <h1>Statistics</h1>
      <Statistics good = {store.getState().good} 
                  neutral = {store.getState().ok}
                  bad = {store.getState().bad}/>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)