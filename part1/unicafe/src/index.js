import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Statistics = ({clicks}) => {
  const { good, neutral, bad, total } = clicks;
  const getAverage = () => total ? (good - bad) / total : 0;
  const getPositivePercentage = () => total ? (good / total) * 100 : 0;

  return (
    <div>
      <h2>statistics</h2>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {total}</p>
      <p>average {getAverage()}</p>
      <p>positive {getPositivePercentage()} %</p>
    </div>
  );
}

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

  return (
    <div>
      <h2>give feedback</h2>
      <button onClick={() => increase('good')}>good</button>
      <button onClick={() => increase('neutral')}>neutral</button>
      <button onClick={() => increase('bad')}>bad</button>
      <Statistics clicks={clicks} />
  </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
