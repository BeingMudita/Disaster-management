import React from "react";
import Navbar from "../components/Navbar"; // Navbar for consistent UI
import "../index.css";

const UserDashboard = () => {
  return (
    <div className="dashboard">
      <Navbar />
      <div className="dashboard-container">
        <h1>Welcome to Your Dashboard</h1>
        <p>Stay updated with real-time alerts and community support.</p>
        <img src="https://via.placeholder.com/800x400" alt="User Dashboard" className="dashboard-img" />
        <div className="dashboard-sections">
          <button className="dashboard-btn">View Emergency Alerts</button>
          <button className="dashboard-btn">Find Nearby Shelters</button>
          <button className="dashboard-btn">Access Disaster Guides</button>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
