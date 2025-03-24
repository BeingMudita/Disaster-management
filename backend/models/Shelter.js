const mongoose = require("mongoose");

const ShelterSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    capacity: { type: Number, required: true },
    contact: { type: String, required: true },
    addedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }  // References the NGO who added the shelter
});

module.exports = mongoose.model("Shelter", ShelterSchema);
