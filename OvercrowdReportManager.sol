// "SPDX-License-Identifier: UNLICENSED"
pragma solidity ^0.7.2;

contract OvercrowdReportManager {
    address payable public owner;
    //event reporting the infected user's presence history hash and its timestamp
    event newReportInserted(bytes32 indexed deptHash, string reportHash, uint timestamp);
    
    constructor() {
       owner = msg.sender;
    }
    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }
    //function to create a new infection's log entry
    function newReport(bytes32 deptHash, string memory reportHash) external onlyOwner(){
          emit newReportInserted(deptHash, reportHash, block.timestamp);
    }
    function destroy() external onlyOwner(){
       selfdestruct(owner); // owner must be payable
    }
}