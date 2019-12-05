import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Statistic = ({text, value}) => {
  return (
    <>
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
    </>
  );
};

const Statistics = ({clicks}) => {
  const { good, neutral, bad, total } = clicks;

  if (!total) {
    return (
      <p>No Feedback given</p>
    );
  }

  const getAverage = () => total ? (good - bad) / total : 0;
  const getPositivePercentage = () => total ? (good / total) * 100 : 0;

  return (
    <div>
      <h2>statistics</h2>
      <table>
        <tbody>
          <Statistic text="good" value={good} />
          <Statistic text="neutral" value={neutral} />
          <Statistic text="bad" value={bad} />
          <Statistic text="all" value={total} />
          <tr>
            <td>average </td>
            <td>{getAverage()}</td>
          </tr>
          <tr>
            <td>positive </td>
            <td>{getPositivePercentage()}</td>
            <td> %</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

const Button = ({increase, text}) => {
  return (
    <button onClick={() => increase(text)}>{text}</button>
  );
};

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
      <Button increase={increase} text="good" />
      <Button increase={increase} text="neutral" />
      <Button increase={increase} text="bad" />
      <Statistics clicks={clicks} />
  </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
