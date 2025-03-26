const mongoose = require("mongoose");

const AlertSchema = new mongoose.Schema({
    message: { type: String, required: true },
    location: {
        type: { type: String, enum: ["Point"], default: "Point" },
        coordinates: { type: [Number], required: true },
        city: { type: String, required: false },
        state: { type: String, required: false }
    },
    severity: { type: String, enum: ["low", "medium", "high"], required: true },
    alertType: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    source: { type: String, default: "Local" } // New field to differentiate between local and external alerts
});

// Geospatial index for location-based queries
AlertSchema.index({ "location.coordinates": "2dsphere" });

module.exports = mongoose.model("Alert", AlertSchema);
