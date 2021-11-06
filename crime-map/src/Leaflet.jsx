import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";

export const Leaflet = ({
  // LocationCrimeData,
  StreetCrimeData,
  CrimeType,
  setCrimeCount,
}) => {
  const LocationMarker = () => {
    const [position, setPosition] = useState(null);
    const map = useMapEvents({
      click() {
        map.locate();
      },
      locationfound(e) {
        setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
      },
    });

    return position === null ? null : (
      <Marker position={position}>
        <Popup>You are here</Popup>
      </Marker>
    );
  };

  return (
    <div id="mymap">
      <MapContainer
        center={[51.505, -0.09]}
        zoom={7}
        scrollWheelZoom={true}
        id="mapstyle"
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* {LocationCrimeData?.map((val, index) => {
          // setMapPosition([val.location.latitude, val.location.longitude]);
          return (
            <Marker position={[val.location.latitude, val.location.longitude]}>
              <Popup>
                <p>
                  <span className="popupTitle">Crime category:</span>{" "}
                  {val.category}
                </p>
                <p>
                  <span className="popupTitle">Location:</span>{" "}
                  {val.location.street.name}
                </p>
                <p>
                  <span className="popupTitle">Outcome:</span>{" "}
                  {val.outcome_status?.category}
                </p>
                <p>
                  <span className="popupTitle">Date:</span>{" "}
                  {val.outcome_status?.date}
                </p>
              </Popup>
            </Marker>
          );
        })} */}
        {StreetCrimeData?.filter((val) => val.category === CrimeType).map(
          (val, index) => {
            setCrimeCount(index + 1);
            console.log(val.robbery);
            return (
              <Marker
                position={[val.location.latitude, val.location.longitude]}
              >
                <Popup>
                  <p>
                    <span className="popupTitle">Crime category:</span>{" "}
                    {val.category}
                  </p>
                  <p>
                    <span className="popupTitle">Location:</span>{" "}
                    {val.location.street.name}
                  </p>
                  <p>
                    <span className="popupTitle">Reported at:</span>{" "}
                    {val?.location_subtype}
                  </p>
                  <p>
                    <span className="popupTitle">Outcome:</span>{" "}
                    {val.outcome_status?.category}
                  </p>
                  <p>
                    <span className="popupTitle">Date:</span>{" "}
                    {val.outcome_status?.date}
                  </p>
                </Popup>
              </Marker>
            );
          }
        )}
        <LocationMarker>
          <Popup>You are here!</Popup>
        </LocationMarker>
      </MapContainer>
    </div>
  );
};
