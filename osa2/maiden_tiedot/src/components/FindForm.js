
const FindForm = ({ searchPara, handleSearchChange }) => {
    return(
      <div>
      find countries<input 
      value = {searchPara}
      onChange = {handleSearchChange}/>
    </div>
    )
  }

export default FindForm