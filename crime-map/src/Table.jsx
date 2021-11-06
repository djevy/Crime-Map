import React, { useState } from "react";
import DATA from "./Major Cities/gb.json";

export const Table = ({
  townData,
  setTownData,
  Date,
  setDate,
  findCrimes,
  LocationCrimeData,
  findStreetCrimes,
  StreetCrimeData,
  // FilteredStreetCrimeData,
  CrimeTypeList,
  CrimeType,
  setCrimeType,
  findCategories,
  CrimeCount,
}) => {
  const [Search, setSearch] = useState(false);
  const handleChange = (value) => {
    const index = value.selectedIndex;
    const el = value.childNodes[index];
    const population = el.getAttribute("population");
    const id = el.getAttribute("id");
    const lat = el.getAttribute("lat");
    const lng = el.getAttribute("lng");
    const city = el.getAttribute("city");

    setTownData({
      ...townData,
      population: population,
      id: id,
      lat: lat,
      lng: lng,
      city: city,
    });
    setSearch(true);

    // findCrimes(Date, lat, lng);
    // findStreetCrimes(Date, lat, lng)
    findCategories(Date);
    console.log(CrimeType);
    console.log("LocationCrimeData: ", LocationCrimeData);
  };

  return (
    <div id="table">
      <h3 id="instructions">Find street level crime in towns and cities of the UK</h3>
      <label htmlFor="towns">Location: </label>
      <select
        className={"dropdown"}
        name="towns"
        id="towns"
        onChange={(e) => {
          handleChange(e.target);
        }}
      >
        <option selected disabled>
          Select a location
        </option>
        {DATA.map((val, index) => {
          return (
            <option
              id={index}
              key={index}
              lat={val.lat}
              lng={val.lng}
              population={val.population}
              city={val.city}
            >
              {val.city}
            </option>
          );
        })}
      </select>

      <label htmlFor="date">Date: </label>
      <input
        className="dropdown"
        type="month"
        id="date"
        name="date"
        min="2018-10"
        onChange={(e) => {
          console.log(e.target.value);
          setDate(e.target.value);
        }}
      />

      <label htmlFor="crimeType">Crime Type: </label>
      <select
        className={"dropdown"}
        name="crimeType"
        id="crimeType"
        onChange={(e) => {
          const index = e.target.selectedIndex;
          const el = e.target.childNodes[index];
          const id = el.getAttribute("id");
          setCrimeType(id);
        }}
      >
        <option selected disabled>
          Select a crime type
        </option>
        {CrimeTypeList?.map((val, index) => {
          return (
            <option id={val.url} key={index}>
              {val.name}
            </option>
          );
        })}
      </select>

      {/* <button onClick={() => findCrimes(Date, townData?.lat, townData?.lng)}> */}
      <button
        id="goBtn"
        onClick={() => findStreetCrimes(Date, townData?.lat, townData?.lng)}
      >
        Go
      </button>

      {Search && (
        <div id="crimeInfo">
          <h3>{townData?.city}</h3>
          <p>
            <b>Population :</b> {townData?.population}
          </p>
          <p>
            <b>Cases of {CrimeType} :</b> {CrimeCount}
          </p>
        </div>
      )}
    </div>
  );
};
