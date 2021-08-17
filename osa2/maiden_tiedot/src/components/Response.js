
import Country from "./Country"

const QueryName = ({ name, handleClick}) => {
    return(
      <div>
        {name} <button onClick = {handleClick} value = {name}>show all</button>
      </div>
    )
}

function filterResults(searchPara, results) {
    const filteredResults = results.filter(result => 
      result.name.toLowerCase()
      .match(searchPara.toLowerCase()))
  
      return filteredResults
}

const Response = ({ searchPara, results, handleClick }) => {
  
    if (searchPara === '') {
      return(
        <div></div>
      )
    }
  
    const filteredResults = filterResults(searchPara, results)
  
    if (filteredResults.length > 10) {
      return(
        <div>
          Too many matches, specify another filter
        </div>
      )
    }
  
    if (filteredResults.length === 1) {
      return(
        <div>
          <Country name = {filteredResults[0].name}
                   capital = {filteredResults[0].capital}
                   population = {filteredResults[0].population}
                   languages = {filteredResults[0].languages}
                   flag = {filteredResults[0].flag}/>
        </div>
      )
    }
  
    return(
      <div>
        {filteredResults.map(result => <QueryName key = {result.alpha2Code} name = {result.name} handleClick = {handleClick}/>)}
      </div>
    )
  }

  export default Response