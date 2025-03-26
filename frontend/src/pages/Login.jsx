import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DarkModeToggle from "../components/DarkModeToggle";
import LanguageSelector from "../components/LanguageSelector";
import "../index.css";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(""); // State for error messages
  const navigate = useNavigate(); // For redirection after login

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear any previous errors

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Store JWT token in localStorage
      localStorage.setItem("token", data.accessToken);

      alert("Login successful!");
      navigate("/dashboard"); // Redirect user after login

    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="login-page">
      <div className="top-right-controls">
        <LanguageSelector />
        <DarkModeToggle />
      </div>

      <div className="login-container">
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>} {/* Show error */}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Login</button>
        </form>
        <p>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
