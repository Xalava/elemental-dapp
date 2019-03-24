pragma solidity ^0.5.0;
contract Register {

  event DocumentAdded(bytes32, uint);
  mapping  (bytes32 => uint) private documents;
  uint public nbDocuments;
  
  function hashData(string memory data) pure public returns(bytes32) {
      return keccak256(abi.encodePacked(data));
  }

  function getDate(bytes32 documentHash) view public returns (uint) {
    return documents[documentHash];
  }

  function addDocument(bytes32 documentHash) public {
    if (getDate(documentHash)== 0){
      documents[documentHash] = now;
      nbDocuments +=1;
      emit DocumentAdded(documentHash,now);
    }
  }
}