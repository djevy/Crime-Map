import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export const Leaflet = ({ CrimeData }) => {
  return (
    <div id="mymap">
      <MapContainer
        center={[51.505, -0.09]}
        zoom={7}
        scrollWheelZoom={false}
        id="mapstyle"
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {CrimeData?.map((val, index) => {
          return (
            <Marker position={[val.location.latitude, val.location.longitude]}>
              <Popup>
                <p><span className="popupTitle">Crime category:</span> {val.category}</p>
                <p><span className="popupTitle">Location:</span> {val.location.street.name}</p>
                <p><span className="popupTitle">Outcome:</span> {val.outcome_status?.category}</p>
                <p><span className="popupTitle">Date:</span> {val.outcome_status?.date}</p>
              </Popup>
            </Marker>
          );
        })}
        <Marker position={[51.505, -0.09]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};
