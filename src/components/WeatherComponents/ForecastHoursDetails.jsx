import React from "react";

const ForecastHoursDetails = ({ data, unit }) => {
  //unit = "Celsius" ή "Fahrenheit" για props
  const convertTemperature = (temp) => {
    return unit === "Celsius"
      ? Math.round(temp)
      : Math.round((temp * 9) / 5 + 32);
  };

  // Ελέγχος της τρέχουσα ώρα της πρόβλεψη
  const currentTime = new Date();
  const filterForecast = data.list.filter(
    (forecast) => forecast.dt * 1000 > currentTime
  );

  const fcListNextHours = filterForecast.slice(0, 7);
  // Διαχωρίση για 3ωρες προβλέψεις της ημέρας σε 7 διαφορετικές ωρες
  
  if (!fcListNextHours) {
    return <p>No forecast data available.</p>;
  }

  return (
    <div className="mt-4 p-4 rounded-xl">
      {/*  ------------------ Εμφάνιση τίτλου ------------------ */}
      <h3 className="text-lg font-semibold mb-3 text-left">
        Today's Forecast
      </h3>
      <div className="flex flex-col md:flex-row gap-4 px-2 pb-2 w-full md:overflow-x-auto">
        {fcListNextHours.map((forecast) => {
          //  ----------- Ορισμός μεταβλητών μέσα στο map ------------
          const iconCode = forecast?.weather?.[0]?.icon;
          const description = forecast?.weather?.[0]?.description;
          // console.log(`${new Date(forecast.dt * 1000).toLocaleTimeString()}, Icon Code: ${iconCode}, Description: ${description}`);
          const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;
          const date = new Date(forecast.dt * 1000);

          return (
            // ------- Χρηση του forecast.dt ως key  ------------------
            <div
              key={forecast.dt}
              className="p-2 rounded-lg text-center md:min-w-[100px] md:w-auto flex-shrink-0 shadow bg-gray-600"
            >
              {/* ------------------- Εμφάνιση Ώρας ---------------------- */}
              <p className="font-semibold text-sm">
                {date.toLocaleTimeString("el-GR", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })}
              </p>
              {/* ------------------- Εμφάνιση Εικονιδίου ---------------- */}
              <img
                src={iconUrl}
                alt={description}
                title={description}
                className="mx-auto my-1 w-20 h-20"
                loading="lazy"
              />
              {/* ---------------- Εμφάνιση Θερμοκρασίας ---------------- */}
              <p className="text-base font-medium">
                {convertTemperature(forecast.main.temp)}°
                <sup>{unit === "Celsius" ? "c" : "f"}</sup>
              </p>
              <p className="text-xs capitalize">
                {description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ForecastHoursDetails;
