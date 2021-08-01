import React from 'react'

const Course = ({ courses }) => {
  
  const values = Object.values(courses)
  var entries = [];
  
  entries.push(<h1>Web development curriculum</h1>)

  for (var i = 0; i < values.length; i++) {
    entries.push(
      <div key = {values[i].id}>
        <Header courses = {values[i]}/>
        <Content parts = {values[i].parts}/>
        <Total parts = {values[i].parts}/>
      </div>
    )
  }
  
  return (
    <div>
      {entries}
    </div>
  )
}

const Header = ({ courses }) => {
    
    return (
      <div>
        <h2>
          {courses.name}
        </h2>
      </div>
    )
  }
  
  const Content = ({ parts }) => {
    return (
        <div>
            {parts.map(part =>
            <Part key = {part.id} name = {part.name} exercises = {part.exercises}/>
            )}
        </div>
    )
  }
  
  const Part = ({ name, exercises }) => {
    return (
      <p>{name} {exercises}</p>
    )
  }
  
  const Total = ({ parts }) => {
    const sum = parts.reduce((acc, obj) => acc + obj.exercises, 0)

    return(
      <b>Number of exercises {sum}</b>
    ) 
  }

  export default Course