import React from 'react'

const Header = ({ name }) => {
    return (
      <h2>{name}</h2>
    )
  }
  
  const Total = ({ parts }) => {
    const sumOfExercises = parts.reduce((sum, parts) => sum + parts.exercises, 0)
    return(
      <p><b>Total of {sumOfExercises} exercises.</b></p>
    ) 
  }
  
  const Part = (props) => {
    return (
      <p>
        {props.part.name} {props.part.exercises}
      </p>    
    )
  }
  
  const Content = ({ parts }) => {
    return (
      <div>
        {parts.map(part =>
          <Part key={part.id} part={part} />
          )}
      </div>
    )
  }
  
  const Courses = ({ course }) => {
    return (
      <div>
          <div>
            <Header name={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
          </div>
      </div>
    )
  }
  
  export default Courses