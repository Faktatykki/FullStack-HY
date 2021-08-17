
import Weather from "./Weather"

const Country = ({ name, capital, population, languages, flag }) => {
    return(
        <div>
          <h1><CountryName name = {name}/></h1>
          <Capital capital = {capital}/>
          <Population population = {population}/>
          <Languages languages = {languages}/>
          <Flag flag = {flag}/>
          <Weather capital = {capital}/>
        </div>
    )
}

const CountryName = ({ name }) => {
    return(
      <div>
        {name}
      </div>
    )
}

const Capital = ({ capital }) => {
    return(
      <div>
        capital {capital}
      </div>
    )
}

const Population = ({ population }) => {
    return(
      <div>
        population {population}
      </div>
    )
  }

const Languages = ({ languages }) => {
    return(
      <div>
        <h2>Languages</h2>
        <ul>
          {languages.map(language => 
          <li key = {language.iso639_1}>{language.name}</li>)}
        </ul>
      </div>
    )
}

const Flag = ({ flag }) => {
    return(
      <div>
        <img src = {flag} alt = "flag of the country" width = "150" height = "150"/>
      </div>
    )
}

export default Country
