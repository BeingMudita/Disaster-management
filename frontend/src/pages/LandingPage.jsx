import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import AlertTicker from "../components/AlertTicker";
import DarkModeToggle from "../components/DarkModeToggle";
import LanguageSelector from "../components/LanguageSelector";
import "../index.css";

import one from "../assets/one.jpg";
import two from "../assets/two.jpg";
import three from "../assets/three.jpg";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleDashboardClick = () => {
    const userRole = localStorage.getItem("userRole");
    if (userRole === "NGO") {
      navigate("/ngo-dashboard");
    } else if (userRole === "User") {
      navigate("/user-dashboard");
    } else {
      navigate("/login"); // Redirect to login if no role is found
    }
  };

  return (
    <div className="landing-page">
      <Navbar />

      {/* Left-side Dashboard Button */}
      <button onClick={handleDashboardClick} className="dashboard-button">
        📊 Go to Dashboard
      </button>

      <AlertTicker />

      <div className="top-right-controls">
        <LanguageSelector />
        <DarkModeToggle />
      </div>

      <section className="hero">
        <h1>Stay Safe, Stay Informed</h1>
        <p className="tagline">"Preparedness today ensures safety tomorrow."</p>
        <img src={one} alt="Disaster Preparedness" className="hero-img" />
      </section>

      <section className="features">
        <h2>Explore Our Features</h2>
        <div className="button-container">
          <Link to="/realtime-alerts" className="feature-btn">🚨 Real-Time Alerts</Link>
          <Link to="/shelter-locator" className="feature-btn">🏠 Shelter Locator</Link>
          <Link to="/donations" className="feature-btn">🤝 Donate & Support</Link>
          <Link to="/post-disaster-support" className="feature-btn">🆘 Post-Disaster Support</Link>
          <Link to="/map" className="feature-btn">🗺️ Live Disaster Map</Link>
          <Link to="/login" className="feature-btn">🔑 Login / Signup</Link>
          <button onClick={handleDashboardClick} className="feature-btn">
            📊 Go to Dashboard
          </button>
        </div>
      </section>

      <section className="map-preview">
        <h2>Live Disaster Map</h2>
        <p>Track real-time disasters around the world.</p>
        <div className="map-container">
          <iframe
            title="Live Disaster Map"
            src="/map"
            className="map-embed"
          ></iframe>
        </div>
        <Link to="/map" className="btn btn-primary mt-3">View Full Map</Link>
      </section>

      <section className="info-section">
        <img src={two} alt="Emergency Awareness" className="info-img" />
        <div className="text-content">
          <h2>Be Alert, Be Aware</h2>
          <p>"Knowledge is power. Knowing how to act in an emergency can save lives."</p>
          <p>Stay updated with real-time alerts and safety tips tailored to your location.</p>
        </div>
      </section>

      <section className="info-section reverse">
        <div className="text-content">
          <h2>You're Not Alone</h2>
          <p>"In the toughest times, communities come together. Let's support each other."</p>
          <p>Join our network to connect with first responders, volunteers, and survivors.</p>
        </div>
        <img src={three} alt="Helping Hands" className="info-img" />
      </section>

      <section className="info-section">
        <img src={one} alt="Preparedness Kit" className="info-img" />
        <div className="text-content">
          <h2>Be Ready, Act Smart</h2>
          <p>"Disasters don't wait. Preparedness starts now."</p>
          <p>Explore our safety guides, emergency kits, and evacuation plans to protect your loved ones.</p>
        </div>
      </section>

      <footer className="footer">
        <p>"Together, we can build a safer tomorrow. Take a step today."</p>
        <p>Stay Safe. Stay Strong. ❤️</p>
      </footer>
    </div>
  );
};

export default LandingPage;
