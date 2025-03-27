import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MapPage from "./pages/MapPage";
import UserDashboard from "./pages/UserDashboard";
import NgoDashboard from "./pages/NgoDashboard";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/ngo-dashboard" element={<NgoDashboard />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
