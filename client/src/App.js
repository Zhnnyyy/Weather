import { useState } from "react";
import "./App.css";
import Navbar from "./components/NavBar/Navbar";
import Main from "./page/Content/Main";

function App() {
  const [onSearch, setOnsearch] = useState(false);
  const [location, setLocation] = useState("");
  const [holdData, setHoldData] = useState("");

  return (
    <div>
      <Navbar
        onSearch={onSearch}
        searching={setOnsearch}
        setLocation={setLocation}
        setHoldData={(data) => setHoldData(data)}
      />
      <Main location={location} locationName={holdData} />
    </div>
  );
}

export default App;
