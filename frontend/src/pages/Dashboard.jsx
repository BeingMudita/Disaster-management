import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [alerts, setAlerts] = useState([]);
  const [shelters, setShelters] = useState([]);

  useEffect(() => {
    // Fetch Alerts
    axios.get("http://localhost:5000/api/alerts").then((res) => {
      setAlerts(res.data);
    });
    
    // Fetch Shelters
    axios.get("http://localhost:5000/api/shelters").then((res) => {
      setShelters(res.data);
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Disaster Management Dashboard</h1>
        <Link to="/profile" className="bg-white text-blue-600 px-4 py-2 rounded">Profile</Link>
      </header>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {/* Alerts Section */}
        <div className="bg-white p-4 shadow rounded-lg">
          <h2 className="text-lg font-semibold">Live Alerts</h2>
          <ul>
            {alerts.map((alert) => (
              <li key={alert.id} className="text-red-600">🚨 {alert.message}</li>
            ))}
          </ul>
        </div>

        {/* Shelters Section */}
        <div className="bg-white p-4 shadow rounded-lg">
          <h2 className="text-lg font-semibold">Find Shelters</h2>
          <ul>
            {shelters.map((shelter) => (
              <li key={shelter.id} className="text-green-600">🏠 {shelter.name} - {shelter.location}</li>
            ))}
          </ul>
        </div>

        {/* Donations Section */}
        <div className="bg-white p-4 shadow rounded-lg">
          <h2 className="text-lg font-semibold">Donate & Support</h2>
          <Link to="/donate" className="bg-blue-500 text-white px-4 py-2 rounded">Donate Now</Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
