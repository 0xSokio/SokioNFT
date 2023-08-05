// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SokioNFT is ERC721, Ownable {
    bool private _minted = false;
    constructor() ERC721("SokioNFT", "SOKIO") {}

    function mint(address _to) public onlyOwner {
        require(!_minted, "Token already minted");
        _mint(_to, 1);
        _minted = true;
    }

    function tokenURI() public pure returns (string memory) {
        return "https://ipfs.io/ipfs/QmU3FdBdUHZnYrSnnuHr9j4dy3NyE9BrozdQaS1rzr3Y7f?filename=1500x500.jpeg";
    }
}