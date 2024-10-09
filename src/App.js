import React, { useState } from "react";
import "./index.css";

const myApi = {
  key: "60610b32f079bbd4aa57c7eb5312160d",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [weather, setWeather] = useState({});
  const [city, setCity] = useState("");
  const [temperature, setTemperature] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [touchedOutside, setTouchedOutside] = useState(false);

  const cityHandler = (e) => {
    setCity(e.target.value);
  };

  const blurHandler = () => {
    setTouchedOutside(true);
    if (city === "") {
      setErrorMessage("You need to enter a city");
    } else {
      setErrorMessage("");
      setTouchedOutside(false);
    }
  };

  const focusHandler = () => {
    setTouchedOutside(false);
    setErrorMessage("");
  };

  const inputClassName = touchedOutside
    ? "searchbar-blur"
    : "searchbar-focused";

  async function fetchWeatherHandler(event) {
    if (event.key === "Enter") {
      if (!city) {
        setErrorMessage("You need to enter a city");
      } else {
        setErrorMessage("");
      }

      try {
        const apiUrl = `${myApi.base}weather?q=${city}&units=metric&APPID=${myApi.key}`;
        const response = await fetch(apiUrl);
        const data = await response.json();

        const tempp = Math.round(data.main.temp);

        setCity("");
        setWeather(data);
        setTemperature(tempp);
        console.log(weather);
      } catch (error) {
        console.log("Error", error);
      }
    }
  }

  const dates = (dates) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];

    let day = days[dates.getDay()]; // 7 günden biri ex. Monday
    let month = months[dates.getMonth()]; // 12 aydan biri ex. January
    let date = dates.getDate(); // Ayın bir günü ex. 13
    let year = dates.getFullYear(); // Yıl ex. 2023

    return `${day} ${date} ${month} ${year}`;
  };

  const todaysDate = dates(new Date());

  let appClassName = "app-cold";
  if (typeof weather.main !== "undefined" && weather.main.temp > 22) {
    appClassName = "app-warm";
  }

  return (
    <div className={appClassName}>
      <main>
        <div className="app">
          <div className="search">
            <input
              className={inputClassName}
              type="text"
              placeholder="Search..."
              value={city}
              onChange={cityHandler}
              onBlur={blurHandler}
              onFocus={focusHandler}
              onKeyDown={fetchWeatherHandler}
            />
            {setErrorMessage && <p className="error-message">{errorMessage}</p>}
          </div>
          <div>
            <p className="fulldate">{todaysDate}</p>
          </div>
          {temperature !== null && (
            <p className="temperature">{temperature}°C</p>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
