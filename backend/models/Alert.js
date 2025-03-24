const mongoose = require("mongoose");

const AlertSchema = new mongoose.Schema({
    message: { type: String, required: true },
    location: {
        type: { type: String, enum: ["Point"], default: "Point" }, // GeoJSON
        coordinates: { type: [Number], required: true }, // [longitude, latitude]
        city: { type: String, required: false }, // Optional city field
        state: { type: String, required: false } // Optional state field
    },
    severity: { type: String, enum: ["low", "medium", "high"], required: true },
    alertType: { type: String, required: true }, // e.g., flood, earthquake, fire
    timestamp: { type: Date, default: Date.now }
});

// Create a geospatial index for location-based queries
AlertSchema.index({ "location.coordinates": "2dsphere" });

module.exports = mongoose.model("Alert", AlertSchema);
