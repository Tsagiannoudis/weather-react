import React from "react";
import ToggleButtonChanger from "./ToggleButtonChanger";
import HumidityIcon from "../../assets/Hymidity.svg";
import WindSpeedIcon from "../../assets/WindSpeed.svg";
import CloudsIcon from "../../assets/Clouds.svg";

const WeatherDetails = ({ data, unit, onUnitChange, onAddToFavorites }) => {
  const { main, weather, wind } = data;

  const temperature = main.temp;
  const humidity = main.humidity;
  const windSpeed = wind.speed;
  const description = weather[0].description;
  const clouds = data.clouds?.all;
  // const feelsLike = main.feels_like;

  const convertTemperature =
    unit === "Celsius"
      ? Math.round(temperature)
      : Math.round((temperature * 9) / 5 + 32);

  return (
    <div className="pr-5">
      <div className="">
        {/* ---------- Title, FavoriteButton, Image, description ------------ */}
        <h2 style={{ fontSize: "16px", fontWeight: "bold" }}>
          Current Weather
        </h2>
        <div className="flex">
          <h2 style={{ fontSize: "32px", fontWeight: "bold" }}>
            {data.name}
          </h2>
          <button
              id="favButton"
              type="button"
              className="rounded-sm p-2 m-2 w-10 bg-gray-600 text-white text-xs  cursor-pointer"
              onClick={() => onAddToFavorites(data.name)}
            >
            Add ⭐
            </button>
        </div>
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
            {convertTemperature}°
            <sup className="text-4xl">{unit === "Celsius" ? "C" : "F"}</sup>
          </p>
          <ToggleButtonChanger onClick={onUnitChange} />
        </div>
        <div className="text-left pl-6">
          {/*-------------- Wind speed, Humidity, Clouds ----------------*/}
          <div className="pt-5 pb-5">
            <div className="pb-2 pt-2">
              <span className="pb-2 pt-2">
                <img
                  src={WindSpeedIcon}
                  alt="WindSpeed Icon"
                  className="w-5 h-5 inline mr-2 invert"
                />
                <span>Wind Speed</span>
                <p>{windSpeed} m/s</p>
              </span>
            </div>
            <div className="pb-2 pt-2">
              <span className="pb-2 pt-2">
                <img
                  src={HumidityIcon}
                  alt="Humidity Icon"
                  className="w-5 h-5 inline mr-2 invert"
                />
                <span>Humidity</span>
                <p>{humidity} m/s</p>
              </span>
            </div>
            <div className="pb-2 pt-2">
              <span className="pb-2 pt-2">
                <img
                  src={CloudsIcon}
                  alt="Clouds Icon"
                  className="w-5 h-5 inline mr-2 invert"
                />
                <span>Clouds</span>
                <p>{clouds}%</p>
              </span>
            </div>

            {/* <p className="pb-2 pt-2">
            <img
              src={FellsLikeIcon}
              alt="Fells Like Icon"
              className="w-6 h-6 inline mr-2 invert"
            />
            {Math.round(feelsLike)}%
          </p> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDetails;
