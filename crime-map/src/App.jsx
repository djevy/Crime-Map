import { useState } from "react";
import "./App.css";
import { Leaflet } from "./Leaflet";
import { Table } from "./Table";

import {
  findCrimesAtALocation,
  findStreetLevelCrime,
  findCrimeCategories,
} from "./Api/PoliceAPI.js";

function App() {
  const [townData, setTownData] = useState();
  const [LocationCrimeData, setLocationCrimeData] = useState();
  const [StreetCrimeData, setStreetCrimeData] = useState();
  const [CrimeTypeList, setCrimeTypeList] = useState()
  const [CrimeType, setCrimeType] = useState()
  const [Date, setDate] = useState();
  const [CrimeCount, setCrimeCount] = useState();

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
      console.log("findStreetCrimes response: ", response);
      setStreetCrimeData(response);
    } catch (err) {
      console.log(err);
    }
  };
  const findCategories = async (date) => {
    try {
      const response = await findCrimeCategories(date);
      console.log("findCategories response: ", response);
      setCrimeTypeList(response);
    } catch (err) {
      console.log(err);
    }
  };

  // function onlyUnique(value, index, self) {
  //   return self.indexOf(value) === index;
  // }

  // const FilteredStreetCrimeData = StreetCrimeData?.filter(onlyUnique)

  return (
    <div className="App">
      <div id="pageTitle">
        <h1>CRIME MAPPER</h1>
      </div>
      <div id="appContainer">
        <Table
          townData={townData}
          setTownData={setTownData}
          Date={Date}
          setDate={setDate}
          findCrimes={findCrimes}
          LocationCrimeData={LocationCrimeData}
          findStreetCrimes={findStreetCrimes}
          StreetCrimeData={StreetCrimeData}
          // FilteredStreetCrimeData={FilteredStreetCrimeData}
          CrimeTypeList={CrimeTypeList}
          findCategories={findCategories}
          CrimeType={CrimeType}
          setCrimeType={setCrimeType}
          CrimeCount={CrimeCount}
        ></Table>
        <Leaflet LocationCrimeData={LocationCrimeData} StreetCrimeData={StreetCrimeData} CrimeType={CrimeType} setCrimeCount={setCrimeCount}></Leaflet>
      </div>
    </div>
  );
}

export default App;
