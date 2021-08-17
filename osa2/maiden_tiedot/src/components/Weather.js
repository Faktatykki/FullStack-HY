

import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ capital }) => {
    const [ weather, setWeather ] = useState([])
  
    const api_key = process.env.REACT_APP_API_KEY
  
    useEffect(() => {
      axios
        .get(`http://api.weatherapi.com/v1/current.json?key=${api_key}&query=${capital}`)
        .then(response => {
          setWeather(response.data)
      })
    }, [])
  
    if (weather.length === 0) {
      return(
        <div>
        </div>
      )
    } else {
      return(
        <div>
          <h3>Weather in {capital}</h3>
          <p><b>Temperature: </b>{weather.current.temp_c} Celsius
          <img src = {weather.current.condition.icon}
               alt = {weather.current.condition.text}/>
               <br/>
          <b>Wind: </b>{weather.current.wind_mph} mph directon {weather.current.wind_dir}
          </p>
        </div>
        )
    }
}

export default Weather