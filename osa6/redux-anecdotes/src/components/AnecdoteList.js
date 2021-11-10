import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdotes = () => {
    const dispatch = useDispatch()

    const filter = useSelector(state => state.filter)
    const unfilteredAnecdotes = useSelector(state => state.anecdotes)

    let anecdotes = unfilteredAnecdotes

    if (filter.filter !== undefined) {
        anecdotes = anecdotes.filter(a => 
            a.content.toLowerCase().includes(filter.filter.toLowerCase()))
    }

    const voteAnecdote = (anecdote) => {
        dispatch(vote(anecdote))
        dispatch(setNotification(`you voted '${anecdote.content}'`, 5))
    }

    return (
        <div>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => voteAnecdote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Anecdotes