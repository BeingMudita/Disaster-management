import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MapPage from "./pages/MapPage"; // Import Map Page
import UserDashboard from "./pages/UserDashboard"; // Import User Dashboard
import NgoDashboard from "./pages/NgoDashboard"; // Import NGO Dashboard

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/map" element={<MapPage />} /> {/* Map Page Route */}
        <Route path="/user-dashboard" element={<UserDashboard />} /> {/* User Dashboard */}
        <Route path="/ngo-dashboard" element={<NgoDashboard />} /> {/* NGO Dashboard */}
      </Routes>
    </Router>
  );
}

export default App;
