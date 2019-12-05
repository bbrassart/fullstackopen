import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  const [clicks, setClicks] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
    total: 0
  });

  const increase = value => {
    const newClicks = {
      ...clicks,
      total: clicks.total + 1
    };

    newClicks[value] = newClicks[value] + 1;
    setClicks(newClicks);
  };

  const getAverage = () => clicks.total ? (clicks.good - clicks.bad) / clicks.total : 0;

  const getPositivePercentage = () => clicks.total ? (clicks.good / clicks.total) * 100 : 0;

  return (
    <div>
      <h2>give feedback</h2>
      <button onClick={() => increase('good')}>good</button>
      <button onClick={() => increase('neutral')}>neutral</button>
      <button onClick={() => increase('bad')}>bad</button>
      <h2>statistics</h2>
      <p>good {clicks.good}</p>
      <p>neutral {clicks.neutral}</p>
      <p>bad {clicks.bad}</p>
      <p>all {clicks.total}</p>
      <p>average {getAverage()}</p>
      <p>positive {getPositivePercentage()} %</p>
  </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
