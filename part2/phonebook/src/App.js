import React, { useState } from 'react';
import Filter from './components/Filter';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]);
  const [ newName, setNewName ] = useState('');
  const [ searchTerm, setSearchTerm ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const isDuplicate = userInput => persons.some(person => person.name === userInput);

  const filteredContacts =
    persons.filter(contact => contact.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const addContact = (event) => {
    event.preventDefault();

    if (isDuplicate(newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    const newPersonObject = { name: newName, number: newNumber };
    setPersons(persons.concat(newPersonObject));
    setNewName('');
    setNewNumber('');
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
      <Persons persons={filteredContacts} />
    </div>
  );
};

export default App;
