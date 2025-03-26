import React, { useEffect, useState } from "react";
import axios from "axios";

const Alerts = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/alerts").then((res) => {
      setAlerts(res.data);
    });
  }, []);

  return (
    <div className="min-h-screen p-4 bg-red-100">
      <h1 className="text-2xl font-bold mb-4">Emergency Alerts</h1>
      <ul>
        {alerts.map((alert) => (
          <li key={alert.id} className="bg-white p-4 shadow rounded mb-2 text-red-600">
            🚨 {alert.message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Alerts;