import { NextRequest, NextResponse } from "next/server";
import {
  createPublicClient,
  decodeEventLog,
  getEventSelector,
  http,
} from "viem";
import { polygonMumbai } from "viem/chains";
import prisma from "@/app/libs/prismaDb";
import getCurrentUser from "@/app/actions/getCurrentUser";

import contractAbi from "@/app/blockchain/contract_abi.json";

export async function PATCH(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("No User Session found");
  }

  const { email, campaignId } = await req.json();

  if (email !== user.email) {
    throw new Error("User cannot verify other campaigns");
  }

  var campaign = await prisma.campaign.findUnique({
    where: { id: campaignId },
  });

  if (!campaign) {
    throw new Error("No such campaigns found");
  }
  const publicClient = createPublicClient({
    chain: polygonMumbai,
    transport: http(polygonMumbai.rpcUrls.public.http[0]),
  });

  const transaction = await publicClient.getTransactionReceipt({
    hash: campaign.transactionHash as `0x${string}`,
  });

  if (transaction.status === "success") {
    const eventLog = transaction.logs.filter(
      (log) =>
        log.topics[0] ===
        getEventSelector(`CampaignCreated(uint256 indexed, string, address)`)
    )[0];
    const contractCampaignArgs: {
      campaignId?: BigInt;
      topic?: string;
      creator?: string;
    } = decodeEventLog({
      abi: contractAbi,
      topics: eventLog.topics,
      data: eventLog.data,
    }).args;
    campaign = await prisma.campaign.update({
      where: {
        id: campaign.id,
      },
      data: {
        verifiedCampaign: true,
        contractCampaignId: contractCampaignArgs.campaignId?.toString(),
      },
    });
  }

  return NextResponse.json({ message: "Campaign Verified", campaign });
}
