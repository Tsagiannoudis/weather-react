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
    <div className="pr-12">
      <div className="">
        {/* -----------------Title, Image, description --------------------- */}
        <h2 style={{ fontSize: "18px", fontWeight: "bold" }}>
            Current Weather
          </h2>
        <h2 style={{ fontSize: "32px", fontWeight: "bold" }}>{data.name}</h2>
        <div className="flex justify-center items-center">
          <img
            src={`https://openweathermap.org/img/wn/${weather[0].icon}.png`}
            alt={description}
            title={description}
            className="w-45 h-45"
            loading="lazy"
          />
        </div>
        <div className="-m-3">
          <p className="text-1xl mb-12">{description}</p>
        </div>
        <div>
          {/*--------------- Temperature & Switcher buttton -----------------*/}
          <p className="text-6xl font-bold pt-2">
            {convertTemperature}°<sup className="text-4xl">{unit === "Celsius" ? "C" : "F"}</sup>
          </p>
          <ToggleButtonChanger onClick={onUnitChange} />
        </div>
        <div className="text-left pl-6">
         {/*----------------- Wind speed & Humidity ------------------*/}
        <div>
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
      </div>
      </div>
    </div>
  );
};

export default WeatherDetails;
