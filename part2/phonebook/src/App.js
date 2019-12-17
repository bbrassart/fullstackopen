import React, { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' }
  ]);
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const isDuplicate = userInput => persons.some(person => person.name === userInput);

  const renderContacts = persons => {
    return persons.map(person => <li key={person.name}>{person.name} {person.number}</li>);
  };

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
        { renderContacts(persons) }
      </ul>
    </div>
  )
};

export default App;
