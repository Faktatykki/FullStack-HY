import React from 'react'

const Statistics = ({ good, neutral, bad }) => {

    const all = good + neutral + bad
    const avg = (good + (bad * -1)) / all
    const pos = (good / all) * 100.0

    return (
            all !== 0 ?
            <div>
                <div>good {good}</div>
                <div>neutral {neutral}</div>
                <div>bad {bad}</div>
                <div>all {all}</div>
                <div>average {avg}</div>
                <div>positive {pos}%</div>
            </div>

            :

            <div>No feedback given</div>
    )
}

export default Statistics