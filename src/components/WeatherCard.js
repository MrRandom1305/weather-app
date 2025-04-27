import React from 'react';
import './WeatherCard.css';

function WeatherCard({ weather }) {
  const { name, main, weather: weatherInfo } = weather;
  return (
    <div className="weather-card">
      <h2>{name}</h2>
      <p>{Math.round(main.temp)}°C</p>
      <p>{weatherInfo[0].main}</p>
    </div>
  );
}

export default WeatherCard;
