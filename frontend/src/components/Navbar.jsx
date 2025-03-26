import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between">
      <h1 className="text-lg font-bold">Disaster Management</h1>
      <div className="space-x-4">
        <Link to="/dashboard" className="hover:underline">Dashboard</Link>
        <Link to="/profile" className="hover:underline">Profile</Link>
        <Link to="/donate" className="hover:underline">Donate</Link>
        <Link to="/" className="hover:underline">Logout</Link>
      </div>
    </nav>
  );
};

export default Navbar;
