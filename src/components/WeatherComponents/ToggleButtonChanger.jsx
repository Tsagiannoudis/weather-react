import React, { useState } from "react";

function ToggleButtonChanger({ onClick }) {
  const [isCelsius, setIsCelsius] = useState(true);

  const handleToggle = () => {
    setIsCelsius(!isCelsius);
    onClick(isCelsius ? "Fahrenheit" : "Celsius");
  };

  return (
    <div>
      <button
        type="button"
        onClick={handleToggle}
        className="rounded-lg p-2 m-2 bg-white text-black text-xs"
      >
        {isCelsius ? "Switch to Fahrenheit" : "Switch to Celsius"}
      </button>
    </div>
  );
}

export default ToggleButtonChanger;
