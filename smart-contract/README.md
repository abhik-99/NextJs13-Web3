#  Hardhat Project

This Hardhat project contains the `VotingCampaign` contract. The contract has been deployed and verified at:
(`0x40c9E869537ae108890f074ec16747b7e66Fa822`)[https://mumbai.polygonscan.com/address/0x40c9E869537ae108890f074ec16747b7e66Fa822#code]

Please note that the contract has not been tested due to time constraint. But in case you want to re-deploy the contract, feel free to follow these steps:
1. Create your ENV file from the `env.copy` file in the project root (not repo root).
2. Run `npx hardhat run .\scripts\deploy.js --network mumbai`.

Note: The above command assumes that you have set network as mumbai in the `hardhat.config.js` file. Please change accordingly.
