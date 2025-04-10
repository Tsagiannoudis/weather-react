import React from "react";

const ForecastHoursDetails = ({ data }) => {
  // Διαχωρίζουμε τις 3ωρες προβλέψεις της ημέρας σε 5 ωρες
  const forecastListNextFiveHoursOfDay = data.list.slice(0, 5);
  // Παίρνουμε τις πρώτες 5 εγγραφές για την πρόβλεψη για τις επόμενες 5 ωρες μεσα στην ημέρα )

  if (!forecastListNextFiveHoursOfDay) {
    return <p>No forecast data available.</p>;
  }

  return (
    <div className="mt-4 p-4 border-1 rounded-xl bg-gray-700">
      <h3 className="text-lg font-semibold mb-3 text-left ml-5">
      Today's Forecast
      </h3>
      <div className="grid grid-cols-5 gap-3">
        {forecastListNextFiveHoursOfDay.map((forecast) => {
          // Ορισμός μεταβλητών μέσα στο map
          const iconCode = forecast?.weather?.[0]?.icon;
          const description = forecast?.weather?.[0]?.description;
          // console.log(`${new Date(forecast.dt * 1000).toLocaleTimeString()}, Icon Code: ${iconCode}, Description: ${description}`);
          const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;
          const date = new Date(forecast.dt * 1000);

          return (
            // Χρησιμοποιούμε το forecast.dt ως key
            <div
              key={forecast.dt}
              className="p-2 rounded-lg text-center shadow"
            >
              {/* Εμφάνιση Ώρας */}
              <p className="font-semibold text-sm">
                {date.toLocaleTimeString("el-GR", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })}
              </p>
              {/* Εμφάνιση Εικονιδίου */}
              <img
                src={iconUrl}
                alt={description}
                title={description}
                className="mx-auto my-1 w-20 h-20"
                loading="lazy"
              />
              {/* Εμφάνιση Θερμοκρασίας */}
              <p className="text-base font-medium">
                {Math.round(forecast.main.temp)}°C
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ForecastHoursDetails;
