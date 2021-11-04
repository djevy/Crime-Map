import React from "react";
import DATA from "./Major Cities/gb.json";

export const Table = ({ townData, setTownData }) => {
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
    // DATA.filter((val) => val.city === Location?.city).map((val, index) => {
    //     setTownData({
    //         lat: val.lat,
    //         lng: val.lng,
    //         population: val.population,
    //         city: val.city,
    //       });
    //   })
  };

  return (
    <div id="table">
      Info
      <select
        name="towns"
        id="towns"
        onChange={(e) => {
          handleChange(e.target);
          console.log(e.target);
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
      <p>{townData?.city}</p>
      <p>{townData?.id}</p>
      <p>{townData?.population}</p>
      <p>{townData?.lat}</p>
      <p>{townData?.lng}</p>
    </div>
  );
};
