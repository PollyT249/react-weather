import React, { useState } from "react";
import axios from "axios";
import "./WeatherSearch.css";

export default function WeatherSearch() {
  const [city, setCity] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [weather, setWeather] = useState({});

  function displayWeather(response) {
    setLoaded(true);
    setWeather({
      city: response.data.name,
      temperature: response.data.main.temp,
      wind: response.data.wind.speed,
      humidity: response.data.main.humidity,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
      description: response.data.weather[0].description,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    let apiKey = "ca0db41e2e878c74a1dfc7ffece370d4";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeather);
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  let form = (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        type="search"
        placeHolder="Enter a city.."
        required
        className="search-form-input"
        onChange={updateCity}
      />
      <button type="submit" className="search-form-button">
        Search
      </button>
    </form>
  );

  if (loaded) {
    return (
      <div className="WeatherSearch">
        {form}

        <div className="weather-app-data">
          <div>
            <h1 className="weather-app-city">{weather.city}</h1>
            <p className="weather-app-details">
              Humidity: <strong>{weather.humidity}%</strong>, Wind:
              <strong>{Math.round(weather.wind)}km/h</strong>
            </p>
          </div>
          <div className="weather-app-temperature-container">
            <img
              src={weather.icon}
              alt={weather.description}
              className="icon"
            />
            <div className="weater-app-temperature">
              {Math.round(weather.temperature)}
            </div>
            <div className="weather-app-unit">℃</div>
          </div>
        </div>
        <footer>
          Built by Polina Tretiakova and open-sourced on{" "}
          <a
            href="https://github.com/PollyT249/react-weather"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        </footer>
      </div>
    );
  } else {
    return (
      <div className="WeatherSearch">
        {form}
        <footer>
          Built by Polina Tretiakova and open-sourced on{" "}
          <a
            href="https://github.com/PollyT249/react-weather"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        </footer>
      </div>
    );
  }
}
