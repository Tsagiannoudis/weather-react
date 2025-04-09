import React from "react";

const WeatherDetails = ({ data }) => {
  const { main, weather, wind } = data;
  const temperature = main.temp;
  const humidity = main.humidity;
  const windSpeed = wind.speed;
  const description = weather[0].description;

  return (
    <div className="grid grid-cols-2">

      {/* left side */}
      <div className="text-left pl-6">
        <div>
          <h2 style={{ fontSize: "32px", fontWeight: "bold" }}>{data.name}</h2>
          <p>Wind Speed: {windSpeed} m/s</p>
          <p>Humidity: {humidity}%</p>
        </div>
        <div>
          <p className="text-5xl font-bold pt-8">{Math.round(temperature)}°C</p>
        </div>
      </div>

      {/* right side */}
      <div className="">
        <div className="flex justify-center items-center h-full">
          <img
            src={`https://openweathermap.org/img/wn/${weather[0].icon}.png`}
            alt={description}
            title={description}
            className="w-40 h-40"
            loading="lazy"
          />
        </div>
        <div className="text-center">
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherDetails;
