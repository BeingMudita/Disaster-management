const express = require("express");
const jwt = require("jsonwebtoken");
const Shelter = require("../models/Shelter");
const User = require("../models/User");

const router = express.Router();

// Middleware to verify NGO
const verifyNGO = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) return res.status(401).json({ message: "Access denied" });

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decoded.userId);

        if (!user || user.role !== "ngo") {
            return res.status(403).json({ message: "Access restricted to NGOs only" });
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};

// Add Shelter (Only NGOs)
router.post("/", verifyNGO, async (req, res) => {
    try {
        const { name, location, capacity, contact } = req.body;

        if (!name || !location || !capacity || !contact) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newShelter = new Shelter({ name, location, capacity, contact });
        await newShelter.save();

        res.status(201).json({ message: "Shelter added successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get All Shelters
router.get("/", async (req, res) => {
    try {
        const shelters = await Shelter.find();
        res.json(shelters);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
