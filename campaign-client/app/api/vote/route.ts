import { NextResponse } from "next/server";
import {
  createPublicClient,
  decodeEventLog,
  getEventSelector,
  http,
} from "viem";
import { polygonMumbai } from "viem/chains";
import contractAbi from "@/app/blockchain/contract_abi.json";
import prisma from "@/app/libs/prismaDb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const campaignId = searchParams.get("campaignId");
  const walletAddress = searchParams.get("walletAddress");
  if (!campaignId || !walletAddress) {
    throw new Error("Campaign ID Empty");
  }

  const vote = await prisma.votes.findMany({
    where: {
      AND: [
        {
          campaign: {
            contractCampaignId: campaignId,
          },
        },
        {
          voter: {
            walletAddress: walletAddress,
          },
        },
      ],
    },
  });
  if (vote.length === 1) {
    return NextResponse.json({ voted: true, snapshotted: false });
  } 

  const publicClient = createPublicClient({
    chain: polygonMumbai,
    transport: http(polygonMumbai.rpcUrls.public.http[0]),
  });

  const voted = await publicClient.readContract({
    address: process.env.DEPLOYED_CONTRACT_ADDRESS as `0x${string}`,
    abi: contractAbi,
    functionName: "hasVoted",
    args: [
      campaignId,
      walletAddress
    ]
  });

  if(voted)
  return NextResponse.json({voted, snapshotted: false})

  return NextResponse.json({ voted: false });
}

export async function POST(req: Request) {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("No User Session found");
  }

  const { hash } = await req.json();
  const publicClient = createPublicClient({
    chain: polygonMumbai,
    transport: http(polygonMumbai.rpcUrls.public.http[0]),
  });

  const transaction = await publicClient.getTransactionReceipt({
    hash: hash as `0x${string}`,
  });

  if (transaction.status === "success") {
    const eventLog = transaction.logs.filter(
      (log) =>
        log.topics[0] ===
        getEventSelector(`VoteCast(uint256 indexed, string, address)`)
    )[0];

    const campaignVoteArgs: {
      campaignId?: BigInt;
      option?: BigInt;
      voter?: string;
    } = decodeEventLog({
      abi: contractAbi,
      topics: eventLog.topics,
      data: eventLog.data,
    }).args;

    if (
      !campaignVoteArgs.campaignId ||
      !campaignVoteArgs.option ||
      !campaignVoteArgs.voter
    ) {
      const vote = await prisma.votes.create({
        data: {
          campaign: {
            connect: {
              contractCampaignId: campaignVoteArgs?.campaignId?.toString(),
            },
          },
          option: campaignVoteArgs.option as unknown as number,
          voter: {
            connect: {
              walletAddress: campaignVoteArgs.voter,
            },
          },
        },
      });

      return NextResponse.json({ message: "success", vote });
    } else {
      throw new Error("Vote not Indexed");
    }
  } else {
    throw new Error("Transaction not success");
  }
}
