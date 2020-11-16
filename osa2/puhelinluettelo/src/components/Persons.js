import React from 'react'
import Person from './Person'
const Persons = ({ personsToShow, handleDeleteOf }) => {
    return (
      personsToShow.map(person =>
        <Person 
          key={person.name} 
          person={person}
          handleDelete={() => handleDeleteOf(person.id)}
        />
      )
    )
  }

  export default Persons