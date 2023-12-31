// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./utils/SignatureUtility.sol";

contract VotingCampaign is Ownable, SignatureUtility {
    struct Campaign {
        uint256 startTime;
        uint256 endTime;
        address creator;
        string topic;
        string[] options;
        mapping(string => uint256) votes;
        mapping(address => bool) hasVoted;
    }

    uint public campaignCount;

    mapping(uint256 => Campaign) public campaignsMapping;
    mapping(uint256 => address) public campaignCreators;

    event CampaignCreated(
        uint256 indexed campaignId,
        string topic,
        address creator
    );
    event VoteCast(uint256 indexed campaignId, uint8 option, address voter);

    function createCampaign(
        string calldata _topic,
        string[] memory _options,
        uint _startTime,
        uint256 _endTime,
        Sign calldata sig
    ) external onlyVerifiedUser(sig) {
        require(_endTime - _startTime >= 2 * 24 * 60 * 60, "Invalid duration");
        uint campaignId = ++campaignCount;
        Campaign storage newCampaign = campaignsMapping[campaignId];

        newCampaign.topic = _topic;
        newCampaign.options = _options;
        newCampaign.startTime = _startTime;
        newCampaign.endTime = _endTime;
        newCampaign.creator = _msgSender();

        campaignCreators[campaignId] = _msgSender();

        emit CampaignCreated(campaignId, _topic, _msgSender());
    }

    function vote(
        uint256 _campaignId,
        string calldata _option,
        Sign calldata sig
    ) external onlyVerifiedUser(sig) {
        require(_campaignId < campaignCount, "Invalid campaign ID");

        Campaign storage campaign = campaignsMapping[_campaignId];
        require(
            block.timestamp >= campaign.startTime &&
                block.timestamp <= campaign.endTime,
            "Voting is not currently active"
        );
        require(
            !campaign.hasVoted[_msgSender()],
            "You have already voted in this campaign"
        );

        bool optionFound = false;
        uint8 i = 0;
        for (; i < campaign.options.length; i++) {
            if (
                keccak256(bytes(campaign.options[i])) ==
                keccak256(bytes(_option))
            ) {
                campaign.votes[_option]++;
                optionFound = true;
                break;
            }
        }

        require(optionFound, "Invalid option");

        campaign.hasVoted[_msgSender()] = true;

        emit VoteCast(_campaignId, i + 1, _msgSender());
    }

    function getVoteCount(
        uint256 _campaignId,
        string calldata _option
    ) external view returns (uint256) {
        require(_campaignId < campaignCount, "Invalid campaign ID");

        Campaign storage campaign = campaignsMapping[_campaignId];
        require(block.timestamp > campaign.endTime, "Voting is still active");

        return campaign.votes[_option];
    }

    function hasVoted(
        uint256 _campaignId, address _addr) view external returns (bool){
            return campaignsMapping[_campaignId].hasVoted[_addr];
    }
}
