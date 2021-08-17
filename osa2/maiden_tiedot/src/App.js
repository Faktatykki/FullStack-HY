import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Response from "./components/Response"
import FindForm from "./components/FindForm"



const App = () => {
  const [ search, setSearch ] = useState('')
  const [ results, setResults ] = useState([])

  const searchHook = () => {
    axios
      .get(`https://restcountries.eu/rest/v2/all`)
      .then(response => {
      setResults(response.data)
    })
  }

  useEffect(searchHook, [])
  
  const handleClick = (event) => {
      setSearch(event.target.value)
  }

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  return (
    <div>
      <FindForm searchPara = {search} handleSearchChange = {handleSearchChange}/>
      <Response key = {results.alpha2Code} searchPara = {search} results = {results} handleClick = {handleClick}/>
    </div>
  )
}

export default App;
