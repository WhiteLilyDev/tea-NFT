// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.

require("@nomiclabs/hardhat-ethers");
const hre = require("hardhat");
const path = require("path");
const fs = require("fs");
const NFTS = require("nft.storage");

// Call dotenv configuration method
require('dotenv').config();

// NFT.storage API Token
const storageToken = process.env.NFT_STORAGE_TOKEN || "";

// NFTStorage client instance
const client = new NFTS.NFTStorage({ token: storageToken });

// Address of the NFT contract after deployment
const CONTRACT_ADDRESS = process.env.NFT_CONTRACT_ADDRESS || "";

// Contract deployer
const OWNER = process.env.PUBLIC_KEY || "";

// Contract interface
const contractInterface = require("../artifacts/contracts/FOOL_NFT.sol/FoolNFT.json").abi;

// Provider
const provider = new hre.ethers.providers.InfuraProvider(process.env.NETWORK, process.env.API_KEY);

// Wallet instance
const wallet = new hre.ethers.Wallet(`0x${process.env.PRIVATE_KEY}`, provider);

// Contract
const contract = new hre.ethers.Contract(CONTRACT_ADDRESS, contractInterface, provider)
const contractWithSigner = contract.connect(wallet);

// Upload file to nft.storage
async function uploadNFTFile({ file, name, description }) {
    console.log("Uploading file to nft storage", { file, name, description });
    const metadata = await client.store({
        name,
        description,
        image: file,
    });
    return metadata;
}

// Mint NFT
async function mintNFT({
    filePath,
    name = "",
    description = "",
}) {
    console.log("NFT to be minted:", { filePath, name, description });
    const file = fs.readFileSync(filePath);

    const metaData = await uploadNFTFile({
        file: new NFTS.File([file.buffer], name, {
            type: "image/png", // image/png
        }),
        name,
        description,
    });

    console.log("NFT data stored on NFT Storage:", metaData);

    const mintTx = await contractWithSigner.safeMint(OWNER, metaData?.url);
    const tx = await mintTx.wait();
    console.log("Minted NFT block address:", tx.blockHash);
}

// Entry function
async function main() {

    // Read files in the assets folder under the root directory
    const files = fs.readdirSync(path.join(__dirname, "../assets"));

    for (const file of files) {
        const filePath = path.join(__dirname, "../assets", file);
        await mintNFT({
            filePath,
            name: file,
            description: path.join(file),
        });
    }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
