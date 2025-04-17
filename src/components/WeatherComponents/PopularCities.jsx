import React, { useState, useEffect } from "react";

const PopoularCities = ({ apiKey, unit }) => {
  const [citiesWeather, setCitiesWeather] = useState([]);
  const popularCities = [
    "London",
    "New York",
    "Tokyo",
    "Berlin",
    "China",
    "Dubai",
  ];

  const convertTemperature = (temp) => {
    return unit === "Celsius"
      ? Math.round(temp)
      : Math.round((temp * 9) / 5 + 32);
  };

  useEffect(() => {
    const fetchWeatherForCities = async () => {
      const weatherData = await Promise.all(
        popularCities.map(async (city) => {
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
          );
          return response.json();
        })
      );
      setCitiesWeather(weatherData);
    };

    fetchWeatherForCities();
  }, [apiKey, unit]);

  return (
    <div className="mt-4 p-4 rounded-xl">
      <h3 className="text-lg font-semibold mb-3 text-left ml-5">
        Popular Cities
      </h3>
      <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-6 gap-4">
        {citiesWeather.map((cityWeather) => (
          <div
            key={cityWeather.id}
            className="p-2 rounded-lg text-center shadow bg-gray-600"
          >
            <h4 className="font-bold text-lg">{cityWeather.name}</h4>
            <img
              src={`https://openweathermap.org/img/wn/${cityWeather.weather[0].icon}.png`}
              alt={cityWeather.weather[0].description}
              className="mx-auto my-1 w-16 h-16"
            />
            <p className="text-base font-medium">
              {convertTemperature(cityWeather.main.temp)}°
              <sup>{unit === "Celsius" ? "c" : "f"}</sup>
            </p>
            <p className="text-sm">{cityWeather.weather[0].description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopoularCities;
