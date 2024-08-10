import React, { useState } from "react";
import "./Navbar.css";
import { CiCloud, CiSearch } from "react-icons/ci";
import Search from "../Search/Search";
function Navbar(props) {
  const [search, setSearch] = useState("");

  function handleChange(e) {
    setSearch(e.target.value);
    props.searching(true);
  }
  function userInput(data) {
    setSearch(data.name);
    props.setLocation(data.location);
    props.setHoldData(data.name);

    props.searching(false);
  }
  return (
    <div className="nav-container">
      <div className="nav-left">
        <CiCloud className="logo" />
        <h1>Weather Today</h1>
      </div>
      <div className="nav-right">
        <div className="input-container">
          <CiSearch className="searchIcon" />
          <input
            type="search"
            onChange={handleChange}
            value={search}
            placeholder="Search for a city"
            autoComplete="off"
          />
        </div>
        {props.onSearch && search.length !== 0 && (
          <Search input={search} userInput={userInput} />
        )}
      </div>
    </div>
  );
}

export default Navbar;
