const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners(); // Get deployer account

    console.log("Deploying contract with account:", deployer.address);

    const Donation = await hre.ethers.getContractFactory("Donation"); // Use the exact contract name
    const ngoAddress = "0xYourNGOAddressHere"; // Replace with actual NGO address
    const contract = await Donation.deploy(ngoAddress);

    await contract.deployed();
    console.log("Contract deployed at:", contract.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
