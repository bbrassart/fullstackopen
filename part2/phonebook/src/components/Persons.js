import React from 'react';

const Persons = ({persons}) => {
  const renderContacts = persons => {
    return persons.map(person => <li key={person.name}>{person.name} {person.number}</li>);
  };

  return (
    <ul>
      { renderContacts(persons) }
    </ul>
  );
};

export default Persons;
