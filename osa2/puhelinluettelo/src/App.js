import React, { useState, useEffect } from 'react'
import personService from './services/persons'

import Persons from './components/Persons'
import PersonForm from './components/Personform'
import Filter from './components/Filter'
import Notification from './components/Notification'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ filter, setFilter ] = useState('')
  const [ results, setResults ] = useState(persons)
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ errorMessage, setErrorMessage ] = useState(null)
  const [ isError, setIsError ] = useState(false)

  useEffect(() => {
      personService
        .getAll()
        .then(person => {
          setPersons(person)
          setResults(person)
        })
  }, [])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)

    if (filter === "") {
      setResults(persons)
    } else {
      setResults(persons.filter(person => person.name.toLowerCase().match(event.target.value.toLowerCase())))
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()
    
    const personObject = {
      name: newName,
      number: newNumber
    }

    if (persons.some(person => person.name === personObject.name)) {
      if (personObject.number.length >= 8) {
        updateNumber(personObject.name, personObject.number)
      } else {
        setIsError(true)
        setErrorMessage('Number must be at least 8 characters')
      }
    } else {
      personService.create(personObject)
      .then(createdPerson => {
        setPersons(persons.concat(createdPerson))
        setResults(results.concat(createdPerson))
        
        setErrorMessage(`Added ${createdPerson.name}`)
      })
      .catch(error => {
        setIsError(true)
        setErrorMessage(error.response.data.error)
      })
      
      setNewName('')
      setNewNumber('')
    } 

    setTimeout(() => {
      setErrorMessage(null)
      setIsError(false)
    }, 3000)
  }

  const removeName = (name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService.remove(name).catch(error => {
      setIsError(true)
      setErrorMessage(`Information of ${name} has already been removed from the server`)      })
      
      setPersons(persons.filter(person => person.name !== name))
      setResults(persons.filter(person => person.name !== name))
      
      setErrorMessage(`Deleted ${name}`)
      setTimeout(() => {
        setErrorMessage(null)
        setIsError(false)
      }, 3000)
    } 

    setIsError(false)
  }

  const updateNumber = (name, number) => {
    if (window.confirm(`${name} is already added to phonebook, replace the old number with a new one?`)) {
        setErrorMessage(`Updated ${name}`)

        personService.update(name, number).catch(error => {
          setIsError(true)
          setErrorMessage(`Information of ${name} has already been removed from the server`)
        })

        const pIndx = persons.findIndex(i => i.name === name)
        const rIndx = persons.findIndex(i => i.name === name)

        const updatedObject = {
          name: name,
          number: number
        }

        const newPersons = [...persons]
        const newResults = [...results]
        newPersons[pIndx] = updatedObject
        newResults[rIndx] = updatedObject
        
        setPersons(newPersons)
        setResults(newResults)
        
        setNewName('')
        setNewNumber('')

        setTimeout(() => {
        setErrorMessage(null)
        setIsError(false)
      }, 3000)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification isError = {isError} note = {errorMessage}/>
      <Filter filter = {filter} handleFilterChange = {handleFilterChange}/>
      <h3>add a new</h3>
      <PersonForm addName = {addName} 
                  newName = {newName}
                  handleNameChange = {handleNameChange}
                  newNumber = {newNumber}
                  handleNumberChange = {handleNumberChange}/>
      <h3>Numbers</h3>
      <Persons persons = {results} removeName = {removeName}/>
    </div>
  )
}

export default App
