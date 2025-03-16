import hotBackground from "../src/assets/sunny.jpg";
import coldBackground from "../src/assets/snow.jpg";
import Descriptions from "./components/Descriptions";
import { useEffect, useState } from "react";
import { getFormattedWeatherData } from "./weatherService";
import { FaSearchLocation } from "react-icons/fa";

function App() {
  const [city, setCity] = useState("Hanoi");
  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState("metric");
  const [inputCity, setInputCity] = useState("");
  const [bg, setBg] = useState(hotBackground);

  useEffect(() => {
    const fetchWeatherData = async () => {
      const data = await getFormattedWeatherData(city, units);
      setWeather(data);

      // dynamic bg
      const threshold = units === "metric" ? 20 : 60;
      if (data.temp <= threshold) setBg(coldBackground);
      else setBg(hotBackground);
    };

    fetchWeatherData();
  }, [units, city]);

  const handleUnitChange = (unit) => {
    setUnits(unit);
  };

  const handleSearch = () => {
    if (inputCity !== "") {
      setCity(inputCity);
      setInputCity("");
    }
  };

  return (
    <div className="app" style={{ backgroundImage: `url(${bg})` }}>
      <div className="overlay">
        {weather && (
          <div className="container">
                <div className="unit-toggle">
                <button
                  className={units === "metric" ? "active" : ""}
                  onClick={() => handleUnitChange("metric")}
                >
                  °C
                </button>
                <button
                  className={units === "imperial" ? "active" : ""}
                  onClick={() => handleUnitChange("imperial")}
                >
                  °F
                </button>
              </div>
            <div className="section section__inputs">
                <input
                  type="text"
                  placeholder="Enter City..."
                  value={inputCity}
                  onChange={(e) => setInputCity(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
                <button onClick={handleSearch}>
                  <FaSearchLocation size={20} />
                </button>
            </div>

            <div className="section section__temperature">
              <div className="weather-header">
                <h3>{`${weather.name}, ${weather.country}`}</h3>
                <h3>{`${weather.currentDate}`}</h3>
                <img src={weather.iconURL} alt="weatherIcon" />
                <h3>{weather.description}</h3>
              </div>
              <div className="temperature">
                <h1>{`${weather.temp.toFixed()} °${
                  units === "metric" ? "C" : "F"
                }`}</h1>
              </div>
            </div>

            <Descriptions weather={weather} units={units} />
            <div className="forecast">
              <h2>5-day Forecast</h2>
              <div className="forecast-container">
                {weather.dailyForecast.map((day, index) => (
                  <div key={index} className="forecast-card">
                    <img src={day.iconURL} alt="weatherIcon" />
                    <h3>{day.date}</h3>
                    <p>{`${day.temp.toFixed()} °${units === "metric" ? "C" : "F"}`}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
