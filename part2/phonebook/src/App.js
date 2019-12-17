import React, { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]);
  const [ newName, setNewName ] = useState('');

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const isDuplicate = userInput => persons.some(person => person.name === userInput);
  const renderNames = persons => persons.map(person => <li key={person.name}>{person.name}</li>);

  const addName = (event) => {
    event.preventDefault();

    if (isDuplicate(newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    const newPersonObject = { name: newName };
    setPersons(persons.concat(newPersonObject));
    setNewName('');
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <input
          value={newName}
          onChange={handleNameChange}
        />
        <button type="submit">add</button>
      </form>
      <h2>Numbers</h2>
      <ul>
        { renderNames(persons) }
      </ul>
    </div>
  )
};

export default App;
