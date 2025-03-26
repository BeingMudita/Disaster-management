const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// Register User or NGO
router.post("/register", async (req, res) => {
    try {
        const { name, email, password, address, city, state, role, identificationNumber } = req.body;

        if (!name || !email || !password || !address || !city || !state || !role) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (role === "ngo" && !identificationNumber) {
            return res.status(400).json({ message: "NGOs must provide an identification number" });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Create and save new user (password hashing is handled in the model)
        const newUser = new User({ name, email, password, address, city, state, role, identificationNumber });
        await newUser.save();

        // Generate JWT token
        const accessToken = jwt.sign(
            { userId: newUser._id, role: newUser.role },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "72h" }
        );

        res.status(201).json({ 
            message: "User registered successfully!", 
            accessToken,
            user: { name: newUser.name, email: newUser.email, role: newUser.role }
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Login User
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Generate JWT token
        const accessToken = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "72h" }
        );

        res.json({
            message: "Login successful",
            accessToken,
            user: { name: user.name, email: user.email, role: user.role }
        });

    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});


module.exports = router;
