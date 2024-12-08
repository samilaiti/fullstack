import { useState, useEffect } from 'react'
import FilterForm from './components/FilterForm'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'
import personService from './services/persons'

const Notification = ({ message, messageType }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={messageType}>
      {message}
    </div>
  )
}

function App() {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [filterPersons, setFilterPersons] = useState(persons)
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState("success")

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
        setFilterPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber
    }

    if (persons.some(person => person.name === newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new number?`)) {
        const person = persons.find(person => person.name === newName)
        const changedPerson = { ...person, number: newNumber}
        personService
          .update(changedPerson.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== returnedPerson.id ? person : returnedPerson))
            setFilterPersons(persons.map(person => person.id !==  returnedPerson.id ? person : returnedPerson))
          })
          .catch(error => {
            setMessageType("error")
            setMessage(`Information of ${changedPerson.name} has already been removed from server`)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
      }
        // alert(`${newName} is already added to phonebook`)
    } else {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setFilterPersons(persons.concat(returnedPerson))    
        })
        setMessageType("success")
        setMessage(
          `Added ${personObject.name}`
        )
        setTimeout(() => {
          setMessage(null)
        }, 5000)
    }
    setNewName('')
    setNewNumber('')
  }

  const deletePerson = person => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .deletePerson(person.id)
        .then(response => {
          setPersons(persons.filter(person => person.id !== response.id))
          setFilterPersons(persons.filter(person => person.id !== response.id))
        })
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    console.log(event.target.value)
    if (event.target.value === '') {
      setFilterName(event.target.value)
      setFilterPersons(persons)
    } else {
      const filtered = persons.filter(person => person.name.toLowerCase().includes(event.target.value))
      console.log(filtered)
      setFilterName(event.target.value)
      setFilterPersons(filtered)  
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} messageType={messageType} />
      <FilterForm filterName={filterName} handleFilter={handleFilter} />
      <h2>add a new</h2>
      <PersonForm addPerson={addPerson} 
        newName={newName} handleNameChange={handleNameChange} 
        newNumber={newNumber} handleNumberChange={handleNumberChange} 
      />
      <h2>Numbers</h2>
      <Persons persons={filterPersons} deletePerson={deletePerson} />
    </div>
  )
}

export default App
