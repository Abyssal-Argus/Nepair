import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet"; // Import Leaflet
import "leaflet/dist/leaflet.css";
import Info from "./Info";

// Fix for default icon issue
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

function Map({ showInfo, setShowInfo }) {
  const locations = [
    { name: "Kathmandu", coords: [27.7172, 85.324] },
    { name: "Janakpur", coords: [26.7288, 85.9263] },
    { name: "Pokhara", coords: [28.2096, 83.9856] },
    { name: "Butwal", coords: [27.7006, 83.4483] },
    { name: "Bhaktapur", coords: [27.6722, 85.4279] },
    { name: "Nepalgunj", coords: [28.05, 81.6167] },
    { name: "Mahendranagar", coords: [28.9634, 80.1838] },
    { name: "Biratnagar", coords: [26.4525, 87.2718] },
    { name: "Birgunj", coords: [27.0167, 84.8667] },
    { name: "Dharan", coords: [26.8129, 87.2832] },
  ];

  return (
    <>
      {showInfo && (
        <div className="info-container">
          <Info setShowInfo={setShowInfo} />
        </div>
      )}
      <MapContainer center={[27.7172, 85.324]} zoom={7} className="frame">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {locations.map((location, index) => (
          <Marker key={index} position={location.coords}>
            <Popup>{location.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </>
  );
}

export default Map;