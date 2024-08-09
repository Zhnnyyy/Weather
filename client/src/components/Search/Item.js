import React from "react";
import "./item.css";
function item(props) {
  function handleClick() {
    props.onClick({ name: props.name, location: props.location });
  }
  return (
    <div className="itemContainer" onClick={handleClick}>
      <p>{props.name}</p>
    </div>
  );
}

export default item;
