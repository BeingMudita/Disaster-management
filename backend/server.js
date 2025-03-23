const express = require("express");
const dotenv = require("dotenv");
const { connectDB, sequelize } = require("./config/db");

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Connect to Database
connectDB();

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

// Synchronize Sequelize models (Only if using PostgreSQL)
if (process.env.DB_DIALECT === "postgres")  {
    sequelize.sync({ alter: true })
        .then(() => console.log("✅ PostgreSQL models synchronized"))
        .catch((err) => console.error("❌ Error syncing PostgreSQL models", err));
}

// Port
const PORT = process.env.PORT || 5000;

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
