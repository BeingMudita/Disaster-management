const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db"); // ✅ Ensure this is correct

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Connect to Database
connectDB(); // ✅ Now it should work

// Middleware
app.use(express.json());

// Import Routes
const alertRoutes = require("./routes/alertRoutes");
const shelterRoutes = require("./routes/shelterRoutes");
const donationRoutes = require("./routes/donationRoutes");

// Use Routes
app.use("/api/alerts", alertRoutes);
app.use("/api/shelters", shelterRoutes);
app.use("/api/donations", donationRoutes);

// Port
const PORT = process.env.PORT || 5000;

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
