import React, { useEffect, useState } from 'react'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommendations from './components/Recommendations'

import { useApolloClient, useQuery, useSubscription } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS, ALL_GENRES, CURRENT_USER } from './gql/queries'
import { BOOK_ADDED } from './gql/subscriptions'

import SetBirthyear from './components/SetBirthyear'

//TARKISTUS
//8.24-.25 SEURAAVAKS

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  useEffect(() => {
    setToken(localStorage.getItem('user-token'))
  }, [])

  const authors = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)
  const genres = useQuery(ALL_GENRES)
  const user = useQuery(CURRENT_USER)

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) =>
      set.map(b => b.id).includes(object.id)

    const dataInStore = client.readQuery({ query: ALL_BOOKS })  
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks : dataInStore.allBooks.concat(addedBook) },
      })
    }
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      window.alert(`${addedBook.title} added!`)
      updateCacheWith(addedBook)
    },
  })

  if (books.loading || authors.loading) {
    return <div>loading...</div>
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  if (!token) {
    return (
      <div>
        <h2>Login</h2>
        <LoginForm
          setToken = {setToken}
        />
      </div>
    )
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('update')}>update author</button>
        <button onClick={() => setPage('recommend')}>recommend</button>
        <button onClick = {logout}>logout</button>
      </div>
        <Authors
          show = {page === 'authors'} authors = {authors.data}
        />

        <Books
          show = {page === 'books'} books = {books.data} genres = {genres.data}
        />

        <NewBook
          show = {page === 'add'} updateCacheWith = {updateCacheWith}
        />

        <SetBirthyear
          show = {page === 'update'} authors = {authors.data}
        />

        <Recommendations
          show = {page === 'recommend'} books = {books.data} user = {user}
        />
    </div>
  )
}

export default App