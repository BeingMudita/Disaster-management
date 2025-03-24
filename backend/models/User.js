const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    role: { 
        type: String, 
        enum: ["user", "ngo"], 
        required: true, 
        default: "user" 
    },
    identificationNumber: { 
        type: String, 
        required: function() { return this.role === "ngo"; }  // Required only if role is NGO
    }
});

module.exports = mongoose.model("User", UserSchema);
