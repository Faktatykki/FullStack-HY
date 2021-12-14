import React, { useState } from 'react'
import Select from 'react-select'

import { useMutation } from '@apollo/client'

import { UPDATE_AUTHOR } from '../gql/mutations'
import { ALL_AUTHORS } from '../gql/queries'

const SetBirthyear = (props) => {
    const [born, setBorn] = useState('')

    const [updateAuthor] = useMutation(UPDATE_AUTHOR, {
        refetchQueries: [{ query: ALL_AUTHORS }],
        onError: (e) => {
            console.log(e)
        }
    })

    const options = props.authors.allAuthors.map(a => {
        return {
            label: a.name,
            value: a.name
        }
    })

    const [selectedOption, setSelectedOption] = useState(options[0])

    if (!props.show) {
        return null
    }

    const submit = async (event) => {
        event.preventDefault()

        const name = selectedOption.value

        updateAuthor({ variables: { name, born } })

        setBorn('')
    }

    return (
        <div>
            <h2>Set Birthyear</h2>
            <form onSubmit={submit}>
                <div>
                    <Select
                        defaultValue={selectedOption}
                        onChange={setSelectedOption}
                        options={options}
                    />
                </div>
                <div>
                    born
                    <input
                        type='number'
                        value={born}
                        onChange={({ target }) => setBorn(parseInt(target.value))}
                    />
                </div>
                <button type='submit'>update author</button>
            </form>
        </div>
    )
}

export default SetBirthyear