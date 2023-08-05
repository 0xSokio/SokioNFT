import Web3 from 'web3';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const OWNER_ADDRESS = process.env.OWNER_ADDRESS;

// Set up web3 object
const web3 = new Web3(new Web3.providers.HttpProvider(SEPOLIA_RPC_URL));

// Load the compiled contract code
let jsonFile = ('out/SokioNFT.sol/SokioNFT.json');
let parsedJson = JSON.parse(fs.readFileSync(jsonFile, 'utf8'));

const contractABI = parsedJson.abi;

// Set up the contract
const contract = new web3.eth.Contract(contractABI, CONTRACT_ADDRESS);

// Create the transaction
const mint = async () => {
  const data = contract.methods.mint(OWNER_ADDRESS).encodeABI();
  const tx = {
    from: OWNER_ADDRESS,
    to: CONTRACT_ADDRESS,
    data,
    gas: 500000,
    maxFeePerGas: 10000000000,    
    maxPriorityFeePerGas: 2000000 
  };

  // Sign the transaction
  const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);

  signPromise.then((signedTx) => {
    const sentTx = web3.eth.sendSignedTransaction(signedTx.raw || signedTx.rawTransaction);

    sentTx.on("receipt", receipt => {
      console.log("Minted successfully!", receipt);
    });

    sentTx.on("error", err => {
      console.log("Minting failed!", err);
    });
  }).catch((err) => {
    console.log('Promise failed:', err);
  });
};

// Mint the token
mint();
