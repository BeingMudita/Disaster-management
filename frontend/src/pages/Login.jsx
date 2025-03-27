import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../api/auth";
import DarkModeToggle from "../components/DarkModeToggle";
import LanguageSelector from "../components/LanguageSelector";
import "../styles/auth.css";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await login(formData);
      localStorage.setItem("token", response.accessToken);
      navigate(response.user.role === "ngo" ? "/ngo-dashboard" : "/user-dashboard");
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="login-page">
      <div className="top-right-controls">
        <LanguageSelector />
        <DarkModeToggle />
      </div>
      <div className="login-container">
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input type="email" name="email" placeholder="📩 Email" onChange={handleChange} required />
          <input type="password" name="password" placeholder="🔑 Password" onChange={handleChange} required />
          <button type="submit" disabled={loading}>{loading ? "Logging in..." : "🔓 Login"}</button>
        </form>
        <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
      </div>
    </div>
  );
};

export default Login;
