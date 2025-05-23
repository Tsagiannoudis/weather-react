import React, { useEffect } from "react";
import { useState } from "react";
import WeatherSearchForm from "./WeatherComponents/WeatherSearchForm";
import WeatherDetailsCard from "./WeatherComponents/WeatherDetailsCard";
import ForecastHoursDetails from "./WeatherComponents/ForecastHoursDetails";
import PopularCities from "./WeatherComponents/PopularCities";

const WeatherApp = () => {
  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [city, setCity] = useState("Thessaloniki");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [favoriteCities, setFavoriteCities] = useState(() => {
    // αποθήκευση αγαπημένων πόλεων στο localStorage
    const savedCities = localStorage.getItem("favoriteCities");
    return savedCities ? JSON.parse(savedCities) : [];
  });

  useEffect(() => {
    const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      city
    )}&appid=${apiKey}&units=metric`;
    const forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(
      city
    )}&appid=${apiKey}&units=metric`;

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

  useEffect(() => {
    // αποθήκευση αγαπημένων πόλεων στο localStorage
    localStorage.setItem("favoriteCities", JSON.stringify(favoriteCities));
  }, [favoriteCities]);

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

  const removeFromFavorites = (cityRemove) => {
    const updatedCities = favoriteCities.filter((city) => city !== cityRemove);
    setFavoriteCities(updatedCities);
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
          {!loading && error && <p className="text-red-500">{error}</p>}
        </div>
      </div>
      <div className="flex flex-col md:flex-row shadow-2xl rounded-lg min-w-2xs">
        {/* ------------------------ main container -------------------------------- */}
        <div className="w-full md:w-1/3 mb-4 md:mb-0 rounded-lg shadow-2xl">
          {/*-------------------------left side-------------------------------*/}
          <div
            className="card pl-4 rounded-bl-lg rounded-tl-lg mx-auto shadow-lg bg-[#436e6f] h-full"
            id="weatherCard"
          >
            <div className="h-full">
              {/*------------------------- Weather at the momemt ---------------------*/}
              <div className="pt-5 pb-5 h-full">
                {weatherData ? (
                  <WeatherDetailsCard
                    data={weatherData}
                    unit={unit}
                    onUnitChange={handleUnitChange}
                    onAddToFavorites={addToFavorites}
                    onRemoveFromFavorites={removeFromFavorites}
                  />
                ) : (
                  <p className="text-lg font-serif">
                    There is no current weather data.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* -------------------------- right side ------------------------------- */}
        <div className="w-full md:w-2/3 rounded-tr-lg rounded-br-lg p-2 bg-[#6a8e8f]">
          <div className="flex justify-between p-2">More Details</div>
          <div className="flex justify-between">
            {/*------------ Weather forecast for the next 5 hours in the some day ------------*/}
            <div className="w-full sm:mx-4 overflow-x-auto">
              {forecastData ? (
                <ForecastHoursDetails data={forecastData} unit={unit} />
              ) : (
                <p className="text-lg font-serif">There is no forecast data.</p>
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
              <h3 className="text-s font-semibold mb-3 text-left ml-5">
                Favorite Cities
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4 ml-4 mr-4">
                {favoriteCities.map((city) => (
                  <div
                    key={city}
                    className="p-2 rounded-lg text-center shadow bg-gray-600 flex items-center justify-between"
                    onClick={() => handleCityChange(city)}
                  >
                    <h4 className="font-bold text-sm cursor-pointer hover:text-blue-300 flex-grow text-left ml-1">
                      {city}
                    </h4>
                    <button onClick={(e) => {
                      e.stopPropagation(); //Αποφυγή εκτέλεσης του onClick του div
                      removeFromFavorites(city)
                      }}>
                      <span className="text-red-500 text-xs cursor-pointer">
                        ❌
                      </span>
                    </button>
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
