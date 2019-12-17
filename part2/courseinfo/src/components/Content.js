import React from 'react';
import Part from './Part';
import Total from './Total';

const renderParts = parts => parts.map(part => <Part key={part.name} part={part} />);

const Content = ({parts}) => (
  <div>
    { renderParts(parts) }
    <Total parts={parts}/>
  </div>
);

export default Content;
