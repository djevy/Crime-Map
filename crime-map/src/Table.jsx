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

      {/* <button onClick={() => findCrimes(Date, townData?.lat, townData?.lng)}> */}
      <button onClick={() => findStreetCrimes(Date, townData?.lat, townData?.lng)}>
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
