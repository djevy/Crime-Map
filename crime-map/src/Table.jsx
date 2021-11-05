import React from "react";
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
  
}) => {
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

    // findCrimes(Date, lat, lng);
    // findStreetCrimes(Date, lat, lng)
    findCategories(Date);
    console.log(CrimeType);
    console.log("LocationCrimeData: ", LocationCrimeData);

  };

  return (
    <div id="table">
      <label htmlFor="towns">Location: </label>
      <select
        className={"dropdown"}
        name="towns"
        id="towns"
        onChange={(e) => {
          handleChange(e.target);
          // console.log(e.target);
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
          const id= el.getAttribute("id");
          // console.log(e.target);
          setCrimeType(id)
        }}
      >
        <option selected disabled>
          Select a crime type
        </option>
        {CrimeTypeList?.map((val, index) => {
          return (
            <option
              id={val.url}
              key={index}
            >
              {val.name}
            </option>
          );
        })}
      </select>

      {/* <button onClick={() => findCrimes(Date, townData?.lat, townData?.lng)}> */}
      <button id="goBtn"
        onClick={() => findStreetCrimes(Date, townData?.lat, townData?.lng)}
      >
        Go
      </button>

      {/* <p>{townData?.city}</p>
      <p>{townData?.id}</p>
      <p>{townData?.population}</p>
      <p>{townData?.lat}</p>
      <p>{townData?.lng}</p> */}

      {LocationCrimeData?.map((val, index) => {
        if (val.length === 0) {
          return <p>No crime reported</p>;
        } else {
          return (
            <div id={index} key={index}>
              <p>Crime category: {val.category}</p>
              <p>Location: {val.location.street.name}</p>
            </div>
          );
        }
      })}
    </div>
  );
};
