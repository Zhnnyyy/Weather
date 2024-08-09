import { useState } from "react";
import "./App.css";
import Navbar from "./components/NavBar/Navbar";
import Main from "./page/Content/Main";

function App() {
  const [onSearch, setOnsearch] = useState(false);
  const [location, setLocation] = useState("");

  return (
    <div>
      <Navbar
        onSearch={onSearch}
        searching={setOnsearch}
        setLocation={setLocation}
      />
      <Main location={location} />
    </div>
  );
}

export default App;
