import { useState } from "react";
import "./App.css";
import { Leaflet } from "./Leaflet";
import { Table } from "./Table";

import { findCrimesAtALocation } from "./Api/PoliceAPI.js"

function App() {
  const [townData, setTownData] = useState();
  const [CrimeData, setCrimeData] = useState();
  const [Date, setDate] = useState();

  const findCrimes = async (date, lat, lng,) => {
    try {
        const response = await findCrimesAtALocation(date, lat, lng)
        console.log('findCrimes response: ', response)
        setCrimeData(response)
        
    } catch (err) {
        console.log(err)
    }
}

  return (
    <div className="App">
      <div id="pageTitle">
        <h1>CRIME MAPPER</h1>
      </div>
      <div id="mapContainer">
        <Table townData={townData} setTownData={setTownData} Date={Date} setDate={setDate} findCrimes={findCrimes} CrimeData={CrimeData}></Table>
        <Leaflet CrimeData={CrimeData}></Leaflet>
      </div>
    </div>
  );
}

export default App;
