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

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({ name, email, password: hashedPassword, address, city, state, role, identificationNumber });

        await newUser.save();
        res.status(201).json({ message: "User registered successfully!" });

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
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const accessToken = jwt.sign(
            { userId: user._id, role: user.role },  // Include role in token
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "72h" }
        );

        return res.json({
            error: false,
            user: {
                name: user.name,
                email: user.email,
                role: user.role
            },
            accessToken,
            message: "Login successful",
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
