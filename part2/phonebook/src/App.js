import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import Notification from './components/Notiifcation';
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
  const [message, setMessage] = useState({});

  const handlePersonDeletion = ({id, name}) => {
    deletePerson(id)
      .then(() => {
        const peopleList = persons.filter(person => person.id !== id);
        setPersons(peopleList);
        notifyUser(`${name} has been deleted from phonebook`, 'success');
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

  const notifyUser = (message, status) => {
    const newMessage = {message, status};
    setMessage(newMessage);
    setTimeout(() => {
      setMessage({})
    }, 5000)
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
          notifyUser(`${newPerson.name} phone number has been modified`, 'success');
          resetUserInputs();
        })
        .catch(() => {
          notifyUser(
            `Information from ${newPerson.name} has already been removed from server`,
            'error'
          );
        });
      return;
    }

    createPerson({ name: newName, number: newNumber })
      .then(newPerson => {
        setPersons(persons.concat(newPerson));
        notifyUser(`${newPerson.name} has been added to phonebook`, 'success');
        resetUserInputs();
      })
      .catch(error => {
        notifyUser(error.response.data.error, 'error');
        resetUserInputs();
      });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      { !!Object.keys(message).length && <Notification message={message.message} status={message.status} /> }
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
