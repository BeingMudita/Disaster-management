const express = require("express");
const router = express.Router();
const Donation = require("../models/Donation");

// POST route to handle donations
router.post("/donate", async (req, res) => {
    try {
        const { donorName, anonymous, amount, donorEmail, donorAddress, ngoId } = req.body;
        if (!amount || !ngoId) {
            return res.status(400).json({ error: "Amount and NGO ID are required." });
        }

        // Save the donation to MongoDB
        const donation = new Donation({
            donorName: anonymous ? "Anonymous" : donorName,
            anonymous,
            amount,
            donorEmail,
            donorAddress,
            ngoId
        });

        await donation.save();
        res.status(201).json({ message: "Donation successful!", donation });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET route to fetch all donations (for transparency)
router.get("/", async (req, res) => {
    try {
        const donations = await Donation.find().populate("ngoId", "name email");
        res.json(donations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
