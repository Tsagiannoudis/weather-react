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
            className="border-2 border-gray-300 rounded-lg p-2 m-2"
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
        </div>
      </form>
    </div>
  );
}

export default WeatherForm;
