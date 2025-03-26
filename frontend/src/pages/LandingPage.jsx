import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-6 bg-opacity-50 backdrop-blur-md">
        <h1 className="text-2xl font-bold">Disaster Aid</h1>
        <div className="space-x-6">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/about" className="hover:underline">About Us</Link>
          <Link to="/contact" className="hover:underline">Contact</Link>
          <Link to="/login" className="bg-white text-blue-600 px-4 py-2 rounded-lg">Login/Signup</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center py-20 px-4">
        <h2 className="text-4xl font-bold mb-4">Be Prepared. Stay Safe.</h2>
        <p className="text-lg mb-6">Get real-time alerts, find shelters, and support those in need.</p>
        <Link to="/signup" className="bg-white text-blue-600 px-6 py-3 rounded-lg text-lg">Get Started</Link>
      </div>

      {/* About Us */}
      <div className="bg-white text-gray-800 p-10 text-center">
        <h3 className="text-3xl font-semibold mb-4">About Us</h3>
        <p className="max-w-3xl mx-auto">Our platform helps communities stay safe during disasters by providing real-time alerts, shelter locations, and donation opportunities.</p>
      </div>

      {/* Footer */}
      <footer className="text-center py-4 bg-gray-800 text-white">
        <p>&copy; 2025 Disaster Aid. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
