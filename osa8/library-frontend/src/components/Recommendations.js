import React, { useState, useEffect } from 'react'

import { useLazyQuery } from '@apollo/client'
import { CURRENT_USER, ALL_BOOKS } from '../gql/queries'


const Recommendations = (props) => {
    const [queryUser, result] = useLazyQuery(CURRENT_USER, {
        fetchPolicy: "no-cache",
        onError: (e) => {
            console.log(e.message)
        }
    })
    const [queryBooks, booksResult] = useLazyQuery(ALL_BOOKS, {
        fetchPolicy: "no-cache",
        onError: (e) => {
            console.log(e.message)
        }
    })

    const [favoriteGenre, setFavoriteGenre] = useState(null)

    useEffect(() => {
        if (result.data && result.data.me !== null) {
            setFavoriteGenre(result.data.me.favoriteGenre)
            queryBooks({ variables: { genre: favoriteGenre } })
        } else {
            queryUser()
        }
    }, [result])

    if (!props.show) {
        return null
    }

    if (!favoriteGenre) {
        return null
    }

    const recommendedBooks = booksResult.data.allBooks
    
    return(
        <div>
            <h2>Recommendations</h2>
            <p>books in your favorite genre <b>{favoriteGenre}</b></p>
            <table>
                <tbody>
                    <tr>
                        <th>
                        </th>
                        <th>author</th>
                        <th>published</th>
                    </tr>
                    {recommendedBooks.map(b => 
                        <tr key = {b.title}>
                            <td>{b.title}</td>
                            <td>{b.author.name}</td>
                            <td>{b.published}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Recommendations