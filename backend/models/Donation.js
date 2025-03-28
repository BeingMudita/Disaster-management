const mongoose = require("mongoose");

const DonationSchema = new mongoose.Schema({
    donorName: { type: String, required: function() { return !this.anonymous; } }, // Required if not anonymous
    anonymous: { type: Boolean, default: false }, // Option for anonymous donations
    amount: { type: Number, required: true, min: 1 },
    donorEmail: { type: String, required: false }, // Optional donor email
    donorAddress: { type: String, required: false }, // Optional donor location
    ngoName: { type: String, required: true } // Now storing NGO name instead of ID
}, { timestamps: true });

module.exports = mongoose.model("Donation", DonationSchema);
