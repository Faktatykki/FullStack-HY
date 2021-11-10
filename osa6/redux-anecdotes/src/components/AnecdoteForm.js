import React from 'react'
import { connect } from 'react-redux'
import { add } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'


const AnecdoteForm = (props) => {
    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        props.add(content)
        props.setNotification(`new anecdote '${content}'`, 5)
    }

    return (
        <div>
            <h2>Create new</h2>
            <form onSubmit = {addAnecdote}>
                <div><input name = "anecdote"/></div>
                <button type = "submit">create</button>
            </form>
        </div>
    )
}

const mapDispatchToProps = {
    add,
    setNotification
}

export default connect(null, mapDispatchToProps)(AnecdoteForm)