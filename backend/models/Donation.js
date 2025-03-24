const mongoose = require("mongoose");

const DonationSchema = new mongoose.Schema({
    donorName: { type: String, required: function() { return !this.anonymous; } }, // Required if not anonymous
    anonymous: { type: Boolean, default: false }, // Option for anonymous donations
    amount: { type: Number, required: true, min: 1 },
    transactionHash: { type: String, required: true, unique: true }, // Blockchain verification
    donorEmail: { type: String, required: false }, // Optional donor email
    donorAddress: { type: String, required: false }, // Optional donor location
    ngoId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to NGO receiving donation
}, { timestamps: true });

module.exports = mongoose.model("Donation", DonationSchema);
