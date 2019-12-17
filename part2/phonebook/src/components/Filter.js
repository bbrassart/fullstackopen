import React from 'react';

const Filter = ({searchTerm, handleSearchTermChange}) => {
  return (
    <div>
      filter shown with:
      <input
        value={searchTerm}
        onChange={handleSearchTermChange}>
      </input>
    </div>
  );
};

export default Filter;
