import React, { useState } from 'react';

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

  const renderContacts = persons => {
    return persons.map(person => <li key={person.name}>{person.name} {person.number}</li>);
  };

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
      <div>
        filter shown with:
        <input
          value={searchTerm}
          onChange={handleSearchTermChange}>
        </input>
      </div>
      <h3>Add a new</h3>
      <form onSubmit={addContact}>
        <div>
          name:
          <input
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>number:
          <input
            value={newNumber}
            onChange={handleNumberChange}
          />
        </div>
       <button type="submit">add</button>
      </form>
      <h2>Numbers</h2>
      <ul>
        { renderContacts(filteredContacts) }
      </ul>
    </div>
  )
};

export default App;
