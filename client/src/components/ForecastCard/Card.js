import React from "react";
import "./card.css";
function Card(props) {
  const formatDate = (dateTimeString) => {
    const date = new Date(dateTimeString.replace(" ", "T") + "Z");
    const dayOptions = { weekday: "long" }; // Full name of the day
    const timeOptions = { hour: "2-digit", minute: "2-digit", hour12: true };
    const dayOfWeek = new Intl.DateTimeFormat("en-US", dayOptions).format(date);
    const time = new Intl.DateTimeFormat("en-US", timeOptions).format(date);
    return `${dayOfWeek} ${time}`;
  };

  return (
    <div className="cardItem">
      <h2>{Math.round(Math.abs(273.15 - props.temp))} °C</h2>
      <h3>{props.date}</h3>
      <h5>{formatDate(props.day)}</h5>
      <img
        src={`https://openweathermap.org/img/wn/${props.icon}@2x.png`}
        alt="icon"
      />
      <h4>{props.desc}</h4>
    </div>
  );
}

export default Card;
