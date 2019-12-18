import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import { getAllPersons, createPerson, deletePerson, updatePerson } from './helpers/personsHelper';

const App = () => {
  const hook = () => {
    getAllPersons()
      .then(persons => {
        setPersons(persons)
      });
  };

  useEffect(hook, []);

  const [persons, setPersons] = useState([]);
  const [ newName, setNewName ] = useState('');
  const [ searchTerm, setSearchTerm ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');

  const handlePersonDeletion = id => {
    deletePerson(id)
      .then(() => {
        const peopleList = persons.filter(person => person.id !== id);
        setPersons(peopleList);
      });
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const resetUserInputs = () => {
    setNewName('');
    setNewNumber('');
  };

  const filteredContacts =
    persons.filter(contact => contact.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const addContact = (event) => {
    event.preventDefault();
    const existingPerson = persons.find(person => person.name === newName);

    const message =
      `${newName} is already added to phonebook, replace the old number with the new one?`;

    if (existingPerson && window.confirm(message)) {
      const { id } = existingPerson;
      const newPerson = { ...existingPerson, number: newNumber };
      updatePerson(id, newPerson)
        .then(response => {
          setPersons(persons.map(person => person.id !== id ? person : response));
          resetUserInputs();
        });
      return;
    }

    createPerson({ name: newName, number: newNumber })
      .then(newPerson => {
        setPersons(persons.concat(newPerson));
        resetUserInputs();
      });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchTerm={searchTerm} handleSearchTermChange={handleSearchTermChange} />
      <h3>Add a new</h3>
      <PersonForm
        addContact={addContact}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons handlePersonDeletion={handlePersonDeletion} persons={filteredContacts} />
    </div>
  );
};

export default App;
