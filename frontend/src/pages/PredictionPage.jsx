import React from "react";
import Navbar from "../components/Navbar"; // Navbar for consistent UI
import "../index.css";

const NgoDashboard = () => {
  return (
    <div className="dashboard">
      <Navbar />
      <div className="dashboard-container">
        <h1>NGO Dashboard</h1>
        <p>Manage relief efforts, donations, and community support.</p>
        <img src="https://via.placeholder.com/800x400" alt="NGO Dashboard" className="dashboard-img" />
        <div className="dashboard-sections">
          <button className="dashboard-btn">Manage Donations</button>
          <button className="dashboard-btn">Update Disaster Reports</button>
          <button className="dashboard-btn">Coordinate Volunteers</button>
        </div>
      </div>
    </div>
  );
};

export default NgoDashboard;
