const express = require("express");
const jwt = require("jsonwebtoken");
const Donation = require("../models/Donation");
const User = require("../models/User");

const router = express.Router();

// Middleware to verify user authentication
const verifyUser = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) return res.status(401).json({ message: "Access denied" });

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = await User.findById(decoded.userId);

        if (!req.user) return res.status(404).json({ message: "User not found" });

        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};

// **1️⃣ Make a Donation (POST /api/donations)**
router.post("/", async (req, res) => {
    try {
        const { donorName, anonymous, amount, donorEmail, donorAddress, ngoName } = req.body;

        // Validate required fields
        if (!ngoName || !amount || (anonymous === false && !donorName)) {
            return res.status(400).json({ message: "Required fields are missing" });
        }

        const newDonation = new Donation({ donorName, anonymous, amount, donorEmail, donorAddress, ngoName });
        await newDonation.save();

        res.status(201).json({ message: "Donation recorded successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/", verifyUser, async (req, res) => {
    try {
        // Find donations made by the logged-in user
        const donations = await Donation.find({ donorEmail: req.user.email }); // Assuming user email is unique
        
        if (!donations) return res.status(404).json({ message: "No donations found for this user" });

        res.json(donations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;
