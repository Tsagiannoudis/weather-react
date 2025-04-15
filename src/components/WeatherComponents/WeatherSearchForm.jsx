import React, { useState } from "react";

function WeatherForm({onSubmit}) {
  const [city, setCity] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (city.trim() === "") {
      alert("Please enter a city name.");
    }
    onSubmit(city);
  }

  return (
    <div>
      {/* form with city input search */}
      <form action="" onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            className="border-1 border-gray-300 rounded-lg w-100 p-2 m-2"
            placeholder="Search for a city..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
          ></input>
          <button
            type="submit"
            className="rounded-lg p-2 m-2 bg-white text-black"
          >
            Search
          </button>
          <button type="button" className="rounded-lg p-2 m-2 bg-white text-black">
            add as favorite</button>
        </div>
      </form>
    </div>
  );
}

export default WeatherForm;
