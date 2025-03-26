import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Donations from "./pages/Donations";
import Shelters from "./pages/Shelter";
import Alerts from "./pages/Alerts";
import CreateShelter from "./pages/CreateAlerts";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/donations" element={<Donations />} />
        <Route path="/shelters" element={<Shelters />} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/create-shelter" element={<CreateShelter />} />
      </Routes>
    </Router>
  );
}

export default App;
