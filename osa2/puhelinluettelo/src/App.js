import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNum, setNewNum ] = useState('')
  const [ showAll ] = useState(false)
  const [ filter, setFilter ] = useState('')
  const [ errorMessage, setErrorMessage ] = useState(null)
  
  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObj = {
      name: newName,
      number: newNum
    }
    const names = persons.map(person => person.name)
    if(names.includes(newName)){
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const personFound = persons.find(person => person.name === newName)
        const id = personFound.id
        personService
         .update(id, personObj)
         .then(returnedPerson => {
           setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
         })
         .catch(error => {
            setErrorMessage(
              `${newName} has been removed by someone!`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 2000)
            setPersons(persons.filter(person => person.id !== id))
        })
        setErrorMessage(
          `${newName} was modified!`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 2000)
      }
      // alert(`${newName} is already added to phonebook!`)
      setNewName('')
      setNewNum('')
    } 
    else {
      personService
        .create(personObj)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNum('')
        })
        setErrorMessage(
          `${newName} was added!`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 2000)
    }
  }

  const personsToShow = showAll
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filter))

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumChange = (event) => {
    setNewNum(event.target.value)
  }

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  const handleDeleteOf = (id) => {
    const name = persons.find(person => person.id === id).name
    if(window.confirm(`Delete ${name}?`)){
      // const url = `http://localhost:3001/persons/${id}`
      const person = persons.find(person => person.id === id)
      const deletedPerson = { ...person }

      personService
        .del(id, deletedPerson)
        .then(
          setPersons(persons.filter(person => person.id !== id))
          )
          setErrorMessage(
            `${deletedPerson.name} was removed!`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 2000)
      }
  }
  
  return (
    <div>
      <Notification message={errorMessage} />
      <h2>Phonebook</h2>
      <div>
        Filter phonebook: <Filter val={filter} handle={handleFilter} />
      </div>

      <h3>Add new person</h3>
      <PersonForm onSubmit={addPerson} 
        nameVal={newName}
        nameOnChng={handleNameChange}
        numVal={newNum}
        numOnChng={handleNumChange}
      />
      <h3>Numbers</h3>
        <Persons personsToShow={personsToShow} handleDeleteOf={handleDeleteOf} />

      {/* <div>debug: {newName}</div> */}
    </div>
  )

}

export default App