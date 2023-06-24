import { getCampaignVotes } from "@/app/actions/getCampaignVotes";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import { createPublicClient, http } from "viem";
import { polygonMumbai } from "viem/chains";
import { getContract } from '@wagmi/core'

import contractAbi from "@/app/blockchain/contract_abi.json";

export async function GET(
  req: Request,
  { params: { id } }: { params: { id: string } }
) {
  const user = await getCurrentUser();
  if(!user) {
    throw new Error("No User Sessions found");
  }

  const votes = await getCampaignVotes(id);
  if(votes.length === 0) {
    const publicClient = createPublicClient({
      chain: polygonMumbai,
      transport: http(polygonMumbai.rpcUrls.public.http[0]),
    });
    const voted = await publicClient.readContract({
      address: process.env.DEPLOYED_CONTRACT_ADDRESS as `0x${string}`,
      abi: contractAbi,
      functionName: "hasVoted",
      args: [id, user.walletAddress]
    }) as unknown as boolean;
    if(voted) {
      throw new Error("Already Voted");
    }
  }

  return NextResponse.json(votes);
}
