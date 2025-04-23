import React, { useEffect } from "react";
import { useState } from "react";
import WeatherSearchForm from "./WeatherComponents/WeatherSearchForm";
import WeatherDetails from "./WeatherComponents/WeatherDetails";
import ForecastHoursDetails from "./WeatherComponents/ForecastHoursDetails";
import PopularCities from "./WeatherComponents/PopularCities";

const WeatherApp = () => {
  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
  const [weatherData, setWeatherData] = React.useState(null);
  const [forecastData, setForecastData] = React.useState(null);
  const [city, setCity] = React.useState("Thessaloniki");
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [favoriteCities, setFavoriteCities] = React.useState([]);

  useEffect(() => {
    const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;
    const forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

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

  const [unit, setUnit] = useState("Celsius");
  const handleUnitChange = (newUnit) => {
    setUnit(newUnit);
  };

  const addToFavorites = (city) => {
    if (!favoriteCities.includes(city)) {
      setFavoriteCities([...favoriteCities, city]);
    } else {
      alert("City already in favorites!");
    }
  };

  return (
    <>
      <div id="searchForm" className="mb-4">
        {/*------------------------- Search form --------------------------------*/}
        <div className="rounded-lg">
          <WeatherSearchForm onSubmit={handleCityChange} />
          {loading && (
            <p className="text-center text-white-600 py-4">
              Loading data for {city}...
            </p>
          )}
          {error && !loading(<p className="text-red-500">{error}</p>)}
        </div>
      </div>
      <div className="flex shadow-2xl rounded-lg min-w-2xs">
        {/* ------------------------ main container -------------------------------- */}
        <div className="mr-4 rounded-lg shadow-2xl">
          {/*-------------------------left side-------------------------------*/}
          <div
            className="card rounded-sm pl-4 mx-auto shadow-lg"
            id="weatherCard"
          >
            <div className="">
              {/*------------------------- Weather at the momemt ---------------------*/}
              <div className="pt-5 pb-5">
                {weatherData ? (
                  <WeatherDetails
                    data={weatherData}
                    unit={unit}
                    onUnitChange={handleUnitChange}
                    onAddToFavorites={addToFavorites}
                  />
                ) : (
                  <p className="text-lg font-serif"></p>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* -------------------------- right side ------------------------------- */}
        <div className="max-w-6xl rounded-lg p-2">
          <div className="flex justify-between p-2">More Details</div>
          <div className="flex justify-between">
            {/*------------ Weather forecast for the next 5 hours in the some day ------------*/}
            <div>
              {forecastData ? (
                <ForecastHoursDetails data={forecastData} unit={unit} />
              ) : (
                <p className="text-lg font-serif"></p>
              )}
            </div>
          </div>
          <div>
            {/*------------------------ Popular cities -----------------------*/}
            <div>
              <PopularCities apiKey={apiKey} unit={unit} />
            </div>
          </div>
          <div>
            <div className="mt-4">
              <h3 className="text-s font-semibold mb-3 text-left ml-5">Favorite Cities</h3>
              <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-6 gap-4 ml-4 mr-4">
                {favoriteCities.map((city) => (
                  <div
                    key={city}
                    className="p-1 rounded-lg text-center shadow bg-gray-600 cursor-pointer"
                    onClick={() => handleCityChange(city)}
                  >
                    <h4 className="font-bold text-sm">{city}</h4>
                  </div>
                ))}
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WeatherApp;
