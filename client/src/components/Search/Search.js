import React, { useEffect, useState } from "react";
import "./Search.css";
import Item from "./Item";
function Search(props) {
  const [list, setList] = useState([]);
  function uInput(data) {
    props.userInput(data);
  }
  useEffect(() => {
    const findLocation = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_PROXY}/location`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ location: props.input }),
          }
        );
        const result = await response.json();
        setList(result);
      } catch (error) {
        console.error(error);
        setList([]);
      }
    };
    findLocation();
  }, [props.input]);
  return (
    <div className="resultContainer">
      {list.length > 0 ? (
        list.map((item, index) => (
          <Item
            name={item.display_name}
            key={index}
            location={`${item.lat},${item.lon}`}
            onClick={uInput}
          />
        ))
      ) : (
        <p style={{ textAlign: "center", color: "white" }}>No results found.</p>
      )}
    </div>
  );
}

export default Search;
