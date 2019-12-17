import React from "react";

const Total = ({parts}) => {
  const total = parts.reduce((total, part) => total + part.exercises, 0);
  return (
    <b>total of {total} exercises</b>
  )
};

export default Total;
