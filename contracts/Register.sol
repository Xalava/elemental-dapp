pragma solidity ^0.5.14;

/// @title Simple Register
/// @author Xavier Lavayssiere
/// @notice Simple register for the Elemental Anchoring dApp
/// @dev This contract has been made for educational purpose and should be not used in production

contract Register {

  event DocumentAdded(bytes32, uint);
  mapping  (bytes32 => uint) private documents;
  uint public nbDocuments;

  /// @dev Hashes data using ethereum's native keccak algorithm
  /// @param data any string

  function hashData(string memory data) public pure returns(bytes32) {
      return keccak256(abi.encodePacked(data));
  }
  /// @dev Retrieves date of the initial registration of the document
  /// @param documentHash 256 bits hash
  /// @return Date in Unix timestamp

  function getDate(bytes32 documentHash) public view returns (uint) {
    return documents[documentHash];
  }
  /// @dev Registers a document hash at the current block date
  /// @param documentHash 256 bits hash

  function addDocument(bytes32 documentHash) public {
    if (getDate(documentHash) == 0){
      documents[documentHash] = now;
      nbDocuments += 1;
      emit DocumentAdded(documentHash,now);
    }
  }
}