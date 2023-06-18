// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const {ethers, run} = require("hardhat");

async function main() {
  const VotingCampaign = await ethers.getContractFactory("VotingCampaign");
  const votingCampaign = await VotingCampaign.deploy();
  await votingCampaign.deployed();
  console.log("Campaign Contract Deployed at", votingCampaign.address);
  // setTimeout(() => run("verify:verify", {
  //   address: votingCampaign.address,
  //   constructorArguments: []
  // }), 5000);  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
