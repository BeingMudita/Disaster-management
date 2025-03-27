import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../api/auth";
import "../styles/auth.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    address: "",
    city: "",
    state: "",
    role: "user",
    identificationNumber: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const fetchLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setFormData({ ...formData, address: `Lat: ${latitude}, Lon: ${longitude}` });
        },
        (error) => {
          alert("Unable to fetch location. Please enter manually.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await signup(formData);
      localStorage.setItem("token", response.accessToken);
      navigate("/user-dashboard");
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Join Us</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSignup}>
          <input type="text" name="fullName" placeholder="👤 Full Name" onChange={handleChange} required />
          <input type="email" name="email" placeholder="📩 Email Address" onChange={handleChange} required />
          <input type="password" name="password" placeholder="🔑 Create Password" onChange={handleChange} required />
          <input type="text" name="address" placeholder="🏠 Address" onChange={handleChange} required />
          <input type="text" name="city" placeholder="🏙️ City" onChange={handleChange} required />
          <input type="text" name="state" placeholder="🌎 State" onChange={handleChange} required />
          <button type="button" className="location-btn" onClick={fetchLocation}>📍 Use My Current Location</button>
          <select name="role" value={formData.role} onChange={handleChange} required>
            <option value="user">👤 Sign Up as a User</option>
            <option value="ngo">🏥 Sign Up as an NGO</option>
          </select>
          {formData.role === "ngo" && (
            <input type="text" name="identificationNumber" placeholder="🔢 NGO Identification Number" onChange={handleChange} required />
          )}
          <button type="submit" className="auth-btn" disabled={loading}>{loading ? "Signing Up..." : "✅ Sign Up"}</button>
        </form>
        <p>Already have an account? <Link to="/login">Login Now</Link></p>
      </div>
    </div>
  );
};

export default Signup;
