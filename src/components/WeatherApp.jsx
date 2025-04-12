import React, { useEffect } from "react";
import { useState } from "react";
import WeatherForm from "./WeatherComponents/WeatherForm";
import WeatherDetails from "./WeatherComponents/WeatherDetails";
import ForecastHoursDetails from "./WeatherComponents/ForecastHoursDetails";

const WeatherApp = () => {
  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
  const [weatherData, setWeatherData] = React.useState(null);
  const [forecastData, setForecastData] = React.useState(null);
  const [city, setCity] = React.useState("Thessaloniki");
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    if (!city) {
      setWeatherData(null);
      setForecastData(null);
      setError(null);
      setLoading(false);
      return;
    }

    const fetchWeatherData = async () => {
      setLoading(true);
      setError(null);
      setWeatherData(null);
      setForecastData(null);

      try {
        //τρέχων ημέρα
        const response = await fetch(weatherApiUrl);
        if (!response.ok) {
          throw new Error(`City not found or API error (${response.status})`);
        }
        const data = await response.json();
        setWeatherData(data);

        //προβλέψεις 5 ημερών
        const forecastResponse = await fetch(forecastApiUrl);
        if (!forecastResponse.ok) {
          throw new Error("City not found");
        }
        const forecastData = await forecastResponse.json();
        setForecastData(forecastData);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData(); //αλλαγή πολής με fetchWeatherData
  }, [apiKey, city]);

  const handleCityChange = (newCity) => {
    setCity(newCity);
  };

  const [ unit, setUnit ] = useState("Celsius");
    const handleUnitChange = (newUnit) => {
      setUnit(newUnit);
    };


  return (
    <>
    <div className="flex">
      {/* left side */}
      <div>Menu</div>
      {/* main container */}
      <div className="p-4 contents">
        {/*Weather card*/}
        <div
          className="card rounded-lg pt-5 mx-auto shadow-lg"
          id="weatherCard"
        >
          {/*Search form*/}
          <div className="rounded-lg">
            <WeatherForm onSubmit={handleCityChange} />
            {loading && (
              <p className="text-center text-blue-600 py-4">
                Loading data for {city}...
              </p>
            )}
            {error && !loading(<p className="text-red-500">{error}</p>)}
          </div>

          {/*Weather data*/}
          <div className="">
            {/*Weather at the momemt*/}
            <div className="pt-5 pb-5">
              {weatherData ? (
                <WeatherDetails data={weatherData} unit={unit} onUnitChange={handleUnitChange} />
              ) : (
                <p className="text-lg font-serif"></p>
              )}
            </div>
            {/*Weather forecast for the next 5 hours in the some day*/}
            <div>
              {forecastData ? (
                <ForecastHoursDetails data={forecastData} unit={unit} />
              ) : (
                <p className="text-lg font-serif"></p>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* right side */}
      <div className="flex justify-between p-2">Favorite Cities</div>
      
      <div className="flex justify-between p-2">Popular Cities</div>
    </div>
    </>
  );
};

export default WeatherApp;
