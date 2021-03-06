import React from 'react';
import ReactDOM from 'react-dom';

const Header = props => <h1>{props.course}</h1>;
const Part = props => <p>{props.part.name} {props.part.exercises}</p>;

const Total = props => {
  const total = props.parts.map(part => part.exercises).reduce((a, b) => a + b, 0);
  return (
    <p>Number of exercises {total}</p>
  )
};

const Content = props => props.parts.map(part => <Part key={part.name} part={part} />);

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  };

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
};

ReactDOM.render(<App />, document.getElementById('root'));
