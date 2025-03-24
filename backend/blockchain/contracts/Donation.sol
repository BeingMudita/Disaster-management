// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Donation {
    struct DonationRecord {
        address donor;
        uint256 amount;
        uint256 timestamp;
        string message;  // Optional message from donor
    }

    address public owner;
    address public ngo;
    DonationRecord[] public donations;

    event DonationReceived(address indexed donor, uint256 amount, string message);

    constructor(address _ngo) {
        owner = msg.sender;
        ngo = _ngo;
    }

    function donate(string memory _message) external payable {
        require(msg.value > 0, "Donation must be greater than 0");

        donations.push(DonationRecord({
            donor: msg.sender,
            amount: msg.value,
            timestamp: block.timestamp,
            message: _message
        }));

        emit DonationReceived(msg.sender, msg.value, _message);
    }

    function withdrawFunds() external {
        require(msg.sender == ngo, "Only the NGO can withdraw funds");
        payable(ngo).transfer(address(this).balance);
    }

    function getDonations() external view returns (DonationRecord[] memory) {
        return donations;
    }
}
