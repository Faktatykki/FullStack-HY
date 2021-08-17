import React from 'react'


const Persons = ({ persons, removeName }) => {
    return(
      <div>
        {persons.map(person =>
        <Person key = {person.name} 
                name = {person.name}
                number = {person.number}
                removeName = {removeName}/>
        )}
      </div>
    ) 
}

const Person = ({ name, number, removeName }) => {
    return(
      <p>{name} {number} <button onClick = {() => removeName(name)}>delete</button></p>
    )
}


export default Persons
