const express = require("express");
const router = express.Router();
const Donation = require("../models/Donation");
const Web3 = require("web3");

// Connect to Ethereum Blockchain (Infura or Local Node)
const web3 = new Web3(process.env.BLOCKCHAIN_RPC_URL);

// Donation Smart Contract (Assuming the contract is already deployed)
const contractABI = require("../blockchain/DonationABI.json"); // ABI of the deployed contract
const contractAddress = process.env.CONTRACT_ADDRESS;
const donationContract = new web3.eth.Contract(contractABI, contractAddress);

// POST route to handle donations
router.post("/donate", async (req, res) => {
    try {
        const { donorName, anonymous, amount, donorEmail, donorAddress, ngoId, senderPrivateKey } = req.body;
        if (!amount || !ngoId || !senderPrivateKey) {
            return res.status(400).json({ error: "Amount, NGO ID, and sender private key are required." });
        }

        const senderAddress = web3.eth.accounts.privateKeyToAccount(senderPrivateKey).address;

        // Interact with the Blockchain Smart Contract
        const transaction = donationContract.methods.donate(ngoId);
        const gas = await transaction.estimateGas({ from: senderAddress });
        const tx = {
            to: contractAddress,
            data: transaction.encodeABI(),
            gas,
        };

        // Sign and Send the Transaction
        const signedTx = await web3.eth.accounts.signTransaction(tx, senderPrivateKey);
        const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

        // Save the donation to MongoDB
        const donation = new Donation({
            donorName: anonymous ? "Anonymous" : donorName,
            anonymous,
            amount,
            transactionHash: receipt.transactionHash,
            donorEmail,
            donorAddress,
            ngoId
        });

        await donation.save();
        res.status(201).json({ message: "Donation successful!", transactionHash: receipt.transactionHash });
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
