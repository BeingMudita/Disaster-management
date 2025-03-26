import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapPage = () => {
  const [disasterData, setDisasterData] = useState([]);

  // Fetch live disaster alerts
  useEffect(() => {
    fetch("https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&limit=10")
      .then((response) => response.json())
      .then((data) => {
        setDisasterData(data.features || []);
      })
      .catch((error) => console.error("Error fetching disaster data:", error));
  }, []);

  return (
    <div className="container text-center mt-5">
      <h2 className="my-3">Live Disaster Map</h2>
      <p>Track real-time disasters around the world.</p>

      {/* Interactive Map */}
      <MapContainer center={[20, 0]} zoom={2} style={{ height: "500px", width: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* Disaster Markers */}
        {disasterData.map((disaster) => (
          <Marker
            key={disaster.id}
            position={[
              disaster.geometry.coordinates[1],
              disaster.geometry.coordinates[0],
            ]}
          >
            <Popup>
              <b>{disaster.properties.place}</b> <br />
              Magnitude: {disaster.properties.mag}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapPage; 