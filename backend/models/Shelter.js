const mongoose = require("mongoose");

const ShelterSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: {
        city: { type: String, required: true },
        state: { type: String, required: true },
        coordinates: { type: [Number], required: true }  // Array for latitude & longitude
    },
    capacity: { type: Number, required: true },
    contact: { type: String, required: true },
    addedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});

module.exports = mongoose.model("Shelter", ShelterSchema);
