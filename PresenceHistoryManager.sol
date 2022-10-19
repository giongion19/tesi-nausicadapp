// "SPDX-License-Identifier: UNLICENSED"
pragma solidity ^0.7.2;

contract PresenceHistoryManager {
    address payable public owner; 
    //event reporting the infected user's presence history hash and its timestamp
    event newHistoryInserted(bytes32 indexed pseudonymHash, string presenceHistoryHash, uint timestamp);
   
    constructor() {
       owner = msg.sender;
    }
    modifier onlyOwner() {
        require(msg.sender == owner);
        _;require(msg.sender == owner);
    }
    //function to create a new infection's log entry
    function newInfection(bytes32 pseudoHash, string memory presenceHash) external onlyOwner(){
          emit newHistoryInserted(pseudoHash, presenceHash, block.timestamp);
    }
    function destroy() external onlyOwner(){
       selfdestruct(owner); // owner must be payable
    }
}