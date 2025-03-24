// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract DonationContract {
    struct Donation {
        address donor;
        uint256 amount;
        uint256 timestamp;
    }

    struct NGO {
        string name;
        string uniqueId;
        address payable wallet;
        Donation[] donations;
        uint256 totalDonations;
    }

    mapping(address => NGO) public ngos;
    address[] public ngoList;

    event DonationReceived(address indexed donor, address indexed ngo, uint256 amount, uint256 timestamp);
    event NGORegistered(address indexed ngoAddress, string name, string uniqueId);

    modifier onlyRegisteredNGO() {
        require(bytes(ngos[msg.sender].uniqueId).length > 0, "Not a registered NGO");
        _;
    }

    function registerNGO(string memory _name, string memory _uniqueId) public {
        require(bytes(ngos[msg.sender].uniqueId).length == 0, "NGO already registered");

        ngos[msg.sender] = NGO({
            name: _name,
            uniqueId: _uniqueId,
            wallet: payable(msg.sender),
            donations: new Donation ,
            totalDonations: 0
        });

        ngoList.push(msg.sender);
        emit NGORegistered(msg.sender, _name, _uniqueId);
    }

    function donate(address _ngo) public payable {
        require(bytes(ngos[_ngo].uniqueId).length > 0, "Invalid NGO");

        ngos[_ngo].donations.push(Donation({
            donor: msg.sender,
            amount: msg.value,
            timestamp: block.timestamp
        }));

        ngos[_ngo].totalDonations += msg.value;
        ngos[_ngo].wallet.transfer(msg.value);

        emit DonationReceived(msg.sender, _ngo, msg.value, block.timestamp);
    }

    function getNGODonations(address _ngo) public view returns (Donation[] memory) {
        return ngos[_ngo].donations;
    }

    function getNGOList() public view returns (address[] memory) {
        return ngoList;
    }
}
