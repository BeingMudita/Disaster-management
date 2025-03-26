import React, { useState } from "react";
import axios from "axios";

const CreateAlerts = () => {
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/alerts", { message });
    alert("Alert Created!");
    setMessage("");
  };

  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Create New Alert</h1>
      <form onSubmit={handleSubmit} className="bg-white p-4 shadow rounded">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter alert message"
          className="border p-2 w-full"
          required
        />
        <button type="submit" className="mt-2 bg-red-500 text-white px-4 py-2 rounded">
          Create Alert
        </button>
      </form>
    </div>
  );
};

export default CreateAlerts;
