import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WeatherCard from './components/WeatherCard';
import TemperatureGraph from './components/TemperatureGraph';
import './App.css';

const API_KEY = '68c40ad3708ae30a12c26e56b646da49'; // Replace with your OpenWeather API key

function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('New York');
  const [background, setBackground] = useState('clear');
  const [hourly, setHourly] = useState([]);

  const fetchWeather = async () => {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeather(res.data);

      const { lat, lon } = res.data.coord;

      const forecastRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );

      const hourlyData = forecastRes.data.list.slice(0, 8).map(item => ({
        time: item.dt_txt.split(' ')[1].slice(0, 5),
        temp: item.main.temp
      }));

      setHourly(hourlyData);

      const condition = res.data.weather[0].main.toLowerCase();
      if (condition.includes('cloud')) setBackground('cloudy');
      else if (
        condition.includes('rain') ||
        condition.includes('drizzle') ||
        condition.includes('thunderstorm')
      ) setBackground('rain');
      else if (condition.includes('snow')) setBackground('snow');
      else setBackground('clear');

    } catch (err) {
      alert('City not found');
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather();
  };

  return (
    <div className="app">
      <video key={background} autoPlay loop muted className="background-video">
        <source src={`/background-videos/${background}.mp4`} type="video/mp4" />
      </video>
      <div className="overlay"></div>
      <div className="content">
        <header className="header">
          <h1 className="title">Live Weather Dashboard</h1>
          <p className="tagline">Real-time weather data with animated backgrounds</p>
        </header>
        <form onSubmit={handleSubmit} className="form">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city"
          />
          <button type="submit">Search</button>
        </form>
        {weather && <WeatherCard weather={weather} />}
        {hourly.length > 0 && <TemperatureGraph data={hourly} />}
      </div>
    </div>
  );
}

export default App;
