const express = require("express");
const axios = require("axios");
const router = express.Router();

// Fetch live disaster alerts directly from ReliefWeb API
const fetchLiveAlerts = async () => {
  try {
    const response = await axios.get("https://api.reliefweb.int/v1/disasters", {
      params: {
        appname: "disaster-alert-app",
        profile: "full",
        sort: "date:desc",
        limit: 50, // Fetch latest 50 alerts
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching live alerts:", error.message || error);
    return { error: "Failed to fetch live alerts" };
  }
};

// API Route: GET /api/alerts (Fetch Live Alerts)
router.get("/", async (req, res) => {
  const alerts = await fetchLiveAlerts();
  res.json(alerts);
});

module.exports = router;
