import React from "react";

const Total = ({parts}) => {
  const total = parts.map(part => part.exercises).reduce((a, b) => a + b, 0);
  return (
    <b>total of {total} exercises</b>
  )
};

export default Total;
