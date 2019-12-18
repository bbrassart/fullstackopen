import React from 'react';

const Persons = ({persons, handlePersonDeletion}) => {
  const deletePerson = ({name, id}) => {
    if(window.confirm(`Delete ${name} ?`)) {
      handlePersonDeletion({name, id});
    }
  };

  const renderContacts = persons => {
    return persons.map(person => {
      return (
        <li key={person.name}>
          {person.name} {person.number}
          <button onClick={() => deletePerson(person)}>
            Delete
          </button>
        </li>
      );
    });
  };

  return (
    <ul>
      { renderContacts(persons) }
    </ul>
  );
};

export default Persons;
