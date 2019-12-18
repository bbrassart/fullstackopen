import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { WEATHERSTACK_API_KEY } from './config';

const imgStyles = {
  width: "150px"
};

const FullCountry = ({country}) => {
  const weatherStackApiBaseUrl = 'http://api.weatherstack.com/current';

  const hook = () => {
    axios
      .get(`${weatherStackApiBaseUrl}?access_key=${WEATHERSTACK_API_KEY}&query=${country.capital}`)
      .then(response => {
        setCurrentWeather(response.data);
      })
  };

  useEffect(hook, []);

  const [currentWeather, setCurrentWeather] = useState({});

  return (
    <div>
      <h3>{country.name}</h3>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h3>Languages</h3>
      <ul>
        {
          country.languages.map(lang => <li key={lang.iso639_1}>{lang.name}</li>)
        }
      </ul>
      <img alt='country flag' src={country.flag} style={imgStyles} />
      {
        !!Object.keys(currentWeather).length &&
        <Weather weather={currentWeather} />
      }
    </div>
  );
};


const Weather = ({weather}) => {
  return (
    <div>
      <h3>Weather in {weather.location.name}</h3>
      <p>Temperature is {weather.current.temperature} Celsius</p>
      {
        weather
          .current
          .weather_icons
          .map(icon => <img key={icon} alt='weather icon' src={icon} style={imgStyles} />)
      }
      <p>Wind is {weather.current.wind_speed} kph direction {weather.current.wind_dir}</p>
    </div>
  );
};

const MinimalCountry = ({country, forceSearchTermChange}) => {
  return (
    <li>
      {country.name}
      <button onClick={() => forceSearchTermChange(country.name)}>
        Show
      </button>
    </li>
  )
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [countries, setCountries] = useState([]);

  const handleSearchTermChange = event => {
    setSearchTerm(event.target.value);
  };

  const hook = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data);
      })
  };

  const forceSearchTermChange = (name) => {
    setSearchTerm(name);
  };

  useEffect(hook, []);

  const filteredCountries =
    countries.filter(country => country.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const renderCountries = countries => {
    if (countries.length === 1) {
      return <FullCountry country={countries[0]} />;
    }
    return (
      <ul>
        {
          countries.map(country => {
            return <MinimalCountry
              forceSearchTermChange={forceSearchTermChange}
              key={country.name}
              country={country} />
          })
        }
      </ul>
    );
  };

  return (
    <div>
      <input value={searchTerm} onChange={handleSearchTermChange} />
      { filteredCountries.length > 10 && <p>Too many matches, specify another filter</p> }
      { filteredCountries.length < 10 && renderCountries(filteredCountries) }
    </div>
  );
};

export default App;
