import React, { useState } from "react";
import { Link } from "react-router-dom";
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

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Get User Location (Auto-fetch)
  const fetchLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setFormData({ ...formData, address: `Lat: ${latitude}, Lon: ${longitude}` });
        },
        (error) => {
          console.error("Error fetching location:", error);
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  // Handle Form Submission
  const handleSignup = (e) => {
    e.preventDefault();
    console.log("Signing up with:", formData);
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Join Us</h2>

        <form onSubmit={handleSignup}>
          <input type="text" name="fullName" placeholder="👤 Full Name" onChange={handleChange} required />
          <input type="email" name="email" placeholder="📩 Email Address" onChange={handleChange} required />
          <input type="password" name="password" placeholder="🔑 Create Password" onChange={handleChange} required />

          {/* Address, City, State */}
          <input type="text" name="address" placeholder="🏠 Address" onChange={handleChange} required />
          <input type="text" name="city" placeholder="🏙️ City" onChange={handleChange} required />
          <input type="text" name="state" placeholder="🌎 State" onChange={handleChange} required />

          {/* Auto-fetch Location Button */}
          <button type="button" className="location-btn" onClick={fetchLocation}>📍 Use My Current Location</button>

          {/* Role Selection */}
          <select name="role" value={formData.role} onChange={handleChange} required>
            <option value="user">👤 Sign Up as a User</option>
            <option value="ngo">🏥 Sign Up as an NGO</option>
          </select>

          {/* NGO Identification Number (Only if NGO is selected) */}
          {formData.role === "ngo" && (
            <input type="text" name="identificationNumber" placeholder="🔢 NGO Identification Number" onChange={handleChange} required />
          )}

          {/* Submit Button */}
          <button type="submit" className="auth-btn">✅ Sign Up</button>
        </form>

        {/* Already Have an Account */}
        <p>Already have an account? <Link to="/login">Login Now</Link></p>
      </div>
    </div>
  );
};

export default Signup;
