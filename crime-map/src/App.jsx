import { useState } from "react";
import "./App.css";
import { Leaflet } from "./Leaflet";
import { Table } from "./Table";

function App() {
  const [townData, setTownData] = useState();

  return (
    <div className="App">
      <div id="pageTitle">
        <h1>CRIME MAPPER</h1>
      </div>
      <div id="mapContainer">
        <Table townData={townData} setTownData={setTownData}></Table>
        <Leaflet></Leaflet>
      </div>
    </div>
  );
}

export default App;
