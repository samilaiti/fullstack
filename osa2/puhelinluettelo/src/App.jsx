import { useState, useEffect } from 'react'
import FilterForm from './components/FilterForm'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'

function App() {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [filterPersons, setFilterPersons] = useState(persons)

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
        setFilterPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber
    }

    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat(personObject))
      setFilterPersons(persons.concat(personObject))
    }
    setNewName('')
    setNewNumber('')
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
      <FilterForm filterName={filterName} handleFilter={handleFilter} />
      <h2>add a new</h2>
      <PersonForm addPerson={addPerson} 
        newName={newName} handleNameChange={handleNameChange} 
        newNumber={newNumber} handleNumberChange={handleNumberChange} 
      />
      <h2>Numbers</h2>
      <Persons persons={filterPersons} />
    </div>
  )
}

export default App
