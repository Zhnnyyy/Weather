import React, { useEffect, useState } from "react";
import "./Main.css";
import Card from "../../components/ForecastCard/Card";
function Main(props) {
  const [weather, setWeather] = useState();
  const [forecast, setForecast] = useState([]);
  const [currentLocation, setCurrentLocation] = useState("");
  if (
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        setCurrentLocation(`${lat},${lon}`);
      },
      (err) => {
        console.err(err);
        throw err;
      }
    )
  ) {
    console.log("Not Supported");
  }

  const findWeather = async (data) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_PROXY}/weather`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ location: data }),
      });
      const result = await response.json();
      setWeather(result);
    } catch (error) {
      console.error(error);
      setWeather([]);
    }
  };

  const findForecast = async (data) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_PROXY}/forecast`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ location: data }),
      });
      const result = await response.json();
      setForecast(result.list);
    } catch (error) {
      console.error(error);
      setForecast([]);
    }
  };

  if (currentLocation) {
    findWeather(currentLocation);
    findForecast(currentLocation);
  }
  useEffect(() => {
    if (props.location) {
      findWeather(props.location);
      findForecast(props.location);
    }
  }, [props.location]);
  return (
    <div className="container">
      {weather && (
        <div className="main-card">
          <div className="info">
            {weather ? (
              <>
                <h2>{Math.round(Math.abs(273 - weather.main?.temp))} °C</h2>
                <span>{weather.weather[0]?.main}</span>
                <br />
                <span>{weather.name}</span>
              </>
            ) : (
              <h2>No Data</h2>
            )}
          </div>
          <div className="icon">
            {weather ? (
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0]?.icon}@2x.png`}
                alt="weather"
              />
            ) : (
              <h2>No Data</h2>
            )}
          </div>
        </div>
      )}
      <div className="card-container">
        {forecast.length > 0 ? (
          forecast.map((item, index) => (
            <Card
              key={index}
              date={item.dt_txt}
              temp={item.main.temp}
              icon={item.weather[0].icon}
              desc={item.weather[0].description}
            />
          ))
        ) : (
          <p style={{ textAlign: "center" }}></p>
        )}
      </div>
    </div>
  );
}

export default Main;
