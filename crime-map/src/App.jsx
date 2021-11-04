import { useState } from "react";
import "./App.css";
import { Leaflet } from "./Leaflet";
import { Table } from "./Table";

import {
  findCrimesAtALocation,
  findStreetLevelCrime,
} from "./Api/PoliceAPI.js";

function App() {
  const [townData, setTownData] = useState();
  const [LocationCrimeData, setLocationCrimeData] = useState();
  const [StreetCrimeData, setStreetCrimeData] = useState();
  const [Date, setDate] = useState();

  const findCrimes = async (date, lat, lng) => {
    try {
      const response = await findCrimesAtALocation(date, lat, lng);
      console.log("findCrimes response: ", response);
      setLocationCrimeData(response);
    } catch (err) {
      console.log(err);
    }
  };
  const findStreetCrimes = async (date, lat, lng) => {
    try {
      const response = await findStreetLevelCrime(date, lat, lng);
      console.log("findCrimes response: ", response);
      setStreetCrimeData(response);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="App">
      <div id="pageTitle">
        <h1>CRIME MAPPER</h1>
      </div>
      <div id="mapContainer">
        <Table
          townData={townData}
          setTownData={setTownData}
          Date={Date}
          setDate={setDate}
          findCrimes={findCrimes}
          LocationCrimeData={LocationCrimeData}
          findStreetCrimes={findStreetCrimes}
          StreetCrimeData={StreetCrimeData}
        ></Table>
        <Leaflet LocationCrimeData={LocationCrimeData} StreetCrimeData={StreetCrimeData}></Leaflet>
      </div>
    </div>
  );
}

export default App;
