[Register]: #Register
[Register-nbDocuments-uint256]: #Register-nbDocuments-uint256
[Register-hashData-string-]: #Register-hashData-string-
[Register-getDate-bytes32-]: #Register-getDate-bytes32-
[Register-addDocument-bytes32-]: #Register-addDocument-bytes32-
[Register-DocumentAdded-bytes32-uint256-]: #Register-DocumentAdded-bytes32-uint256-
## <span id="Register"></span> `Register`

Simple register for the Elemental Anchoring dApp


This contract has been made for educational purpose and should be not used in production

- [`hashData(string data)`][Register-hashData-string-]
- [`getDate(bytes32 documentHash)`][Register-getDate-bytes32-]
- [`addDocument(bytes32 documentHash)`][Register-addDocument-bytes32-]
- [`DocumentAdded(bytes32, uint256)`][Register-DocumentAdded-bytes32-uint256-]

### <span id="Register-hashData-string-"></span> `hashData(string data) → bytes32` (public)



Hashes data using ethereum's native keccak algorithm


### <span id="Register-getDate-bytes32-"></span> `getDate(bytes32 documentHash) → uint256` (public)



Retrieves date of the initial registration of the document


### <span id="Register-addDocument-bytes32-"></span> `addDocument(bytes32 documentHash)` (public)



Registers a document hash at the current block date


### <span id="Register-DocumentAdded-bytes32-uint256-"></span> `DocumentAdded(bytes32, uint256)`





