import React, { useEffect, useState } from 'react'


const Books = (props) => {
  const [genreFilter, setGenreFilter] = useState('all')
  const [booksByGenre, setBooksByGenre] = useState(props.books.allBooks)

  useEffect(() => {
    genreFilter === 'all' ?
      setBooksByGenre(props.books.allBooks)
    :
      setBooksByGenre(props.books.allBooks.filter(b => b.genres.includes(genreFilter)))
  }, [genreFilter, props.books.allBooks])

  if (!props.show) {
    return null
  }

  let genres = props.genres.allBooks

  const merged = []

  genres.map(g => merged.push(g.genres))
  genres = merged.flat(1).filter((v, i, s) => {
    return s.indexOf(v) === i
  })

  return (
    <div>
      <h2>books</h2>
      <p>in genre <b>{genreFilter}</b></p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {booksByGenre.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      {genres.map(g => 
          <button key = {g} onClick ={() => setGenreFilter(g)}>{g}</button>
        )}
    </div>
  )
}

export default Books