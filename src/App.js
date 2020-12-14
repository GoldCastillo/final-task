import "./App.css";
import React, {useState} from "react"
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Home from "./Components/Home";
import Customers from "./Components/Customers";
import Trainings from "./Components/Trainings"
import EventCalendar from "./Components/EventCalendar";

function App() {
  const [value, setValue] = useState("Home");
  const handleChange = (event, value) => {
    setValue(value);
  };

  return (
    <div className="App">
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange}>
          <Tab value="Home" label="Home" />
          <Tab value="Customers" label="Customers" />
          <Tab value="Trainings" label="Trainings" />
          <Tab value="Calendar" label="Calendar"/>
        </Tabs>
      </AppBar>
      {value === "Home" && (
        <div>
          <Home />
        </div>
      )}
      {value === "Customers" && (
        <div>
          <Customers />
        </div>
      )}
      {value === "Trainings" && (
        <div>
          <Trainings />
        </div>
      )}
      {value === "Calendar" && (
        <div> 
          <EventCalendar />
          </div>
      )}
    </div>
  );
}

export default App;
