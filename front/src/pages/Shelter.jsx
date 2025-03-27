import React, { useEffect, useState } from "react";
import axios from "axios";

const Shelters = () => {
  const [shelters, setShelters] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/shelters").then((res) => {
      setShelters(res.data);
    });
  }, []);

  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Available Shelters</h1>
      <ul>
        {shelters.map((shelter) => (
          <li key={shelter.id} className="bg-white p-4 shadow rounded mb-2">
            🏠 {shelter.name} - {shelter.location}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Shelters;