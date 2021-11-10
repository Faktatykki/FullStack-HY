import anecdoteService from '../services/anecdotes'

export const vote = (anecdote) => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.updateVote(anecdote)
    dispatch({
      type: 'VOTE',
      data: updatedAnecdote,
    })
  }
}

export const add = (anecdoteData) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(anecdoteData)
    dispatch({
      type: 'ADD',
      data: newAnecdote, 
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

const anecdoteReducer = (state = [], action) => {
  switch(action.type) {
    case 'INIT_ANECDOTES':
      return action.data
    case 'VOTE':
      const id = action.data.id
      const anecdoteToChange = state.find(n => n.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      const updatedAnecdotes = state.map(a => a.id !== id ? a 
                                              : 
                                              changedAnecdote)
      return updatedAnecdotes.slice().sort((a, b) => a.votes > b.votes ? -1 : 1)
    case 'ADD':
      return state.concat(action.data)
      
    default: return state
  }
}


export default anecdoteReducer