import React from "react";
import ToggleButtonChanger from "./ToggleButtonChanger";
import HumidityIcon from "../../assets/Hymidity.svg";
import WindSpeedIcon from "../../assets/WindSpeed.svg";

const WeatherDetails = ({ data, unit, onUnitChange }) => {
  const { main, weather, wind } = data;

  const temperature = main.temp;
  const humidity = main.humidity;
  const windSpeed = wind.speed;
  const description = weather[0].description;

  const convertTemperature =
    unit === "Celsius" ? Math.round(temperature) : Math.round((temperature * 9) / 5 + 32);
  

  return (
    <div className="grid grid-cols-2">
      {/* left side */}
      <div className="text-left pl-6">
        <div>
          <h2 style={{ fontSize: "18px", fontWeight: "bold" }}>
            Current Weather
          </h2>
          <p className="text-sm pb-6">Last updated: {}</p>
          <p className="pb-2 pt-2">
            <img
              src={WindSpeedIcon}
              alt="WindSpeed Icon"
              className="w-6 h-6 inline mr-2 invert"
            />
            {windSpeed} m/s
          </p>
          <p>
            <img
              src={HumidityIcon}
              alt="Humidity Icon"
              className="w-6 h-6 inline mr-2 invert"
            />
            {humidity}%
          </p>
        </div>
        <div>
          <p className="text-5xl font-bold pt-4">
            {convertTemperature}°{unit === "Celsius" ? "C" : "F"}
          </p>
          <ToggleButtonChanger onClick={onUnitChange} />
        </div>
        <div className="pt-2 pl-2">
          <p>{description}</p>
        </div>
      </div>

      {/* right side */}
      <div className="">
        <h2 style={{ fontSize: "32px", fontWeight: "bold" }}>{data.name}</h2>
        <div className="flex justify-center items-center">
          <img
            src={`https://openweathermap.org/img/wn/${weather[0].icon}.png`}
            alt={description}
            title={description}
            className="w-40 h-40"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

export default WeatherDetails;
