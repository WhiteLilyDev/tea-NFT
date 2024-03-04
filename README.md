# tea-NFT - Blockchain-Based Non-Fungible Token Platform

![tea-NFT Logo](/assets/teanfttest.png){:width="200px"}

## Project Overview

tea-NFT is a non-fungible token (NFT) platform based on Ethereum, allowing users to create, mint, purchase, and trade unique digital assets. Through tea-NFT, users can transform their creativity and works into digital artworks that can be circulated on the blockchain.

## File Structure

- contracts/: Directory for storing smart contracts
- scripts/: Directory for storing deployment and minting scripts
- assets/: Directory for storing files to be minted
- test/: Directory for temporary test files
- package.json: Project dependency configuration file
- hardhat.config.js: Hardhat configuration file
- README.md: Project README file

## Smart Contracts

- contracts/TeaNFT.sol: Implements a blockchain-based non-fungible token contract, providing functionalities for creating, minting, burning, and managing NFTs.

## Scripts

- scripts/deploy.js: Used to deploy smart contracts to the Ethereum network and print out the deployed contract address and contract owner address.
- scripts/mint.js: Used to mint local files into NFTs and upload them to NFT Storage.

## Usage

1. Clone the project code to your local environment.
2. Configure environment variables, including NFT Storage API Token, network settings, private keys, etc.
3. Place files to be minted in the `assets/` directory.
4. Execute the `npx hardhat run scripts/mint.js` script to mint NFTs.

## Notes

- Before executing deployment and minting scripts, ensure that network settings and private keys in the configuration file are correct.
- Deploying smart contracts and minting NFTs require a certain amount of GAS fees, ensure that your account has enough corresponding currency on the chain.

## Contribution

In the testing phase, not yet completed, contributions, questions, suggestions, or code contributions are welcome!

## License Information

For details, please refer to the [LICENSE](LICENSE) file.
