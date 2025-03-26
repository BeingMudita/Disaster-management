import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100%",
  height: "500px",
};

const center = {
  lat: 28.6139, // Default latitude (Delhi, India)
  lng: 77.209, // Default longitude
};

const shelters = [
  { id: 1, name: "Shelter A", lat: 28.6448, lng: 77.2167 },
  { id: 2, name: "Shelter B", lat: 28.5355, lng: 77.3910 },
  { id: 3, name: "Shelter C", lat: 28.4089, lng: 77.3178 },
];

const ShelterLocator = () => {
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      () => console.log("Geolocation permission denied")
    );
  }, []);

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <div>
        <h2>Find Nearby Shelters</h2>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={userLocation || center}
          zoom={12}
        >
          {userLocation && <Marker position={userLocation} label="You" />}
          {shelters.map((shelter) => (
            <Marker key={shelter.id} position={{ lat: shelter.lat, lng: shelter.lng }} label={shelter.name} />
          ))}
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default ShelterLocator;