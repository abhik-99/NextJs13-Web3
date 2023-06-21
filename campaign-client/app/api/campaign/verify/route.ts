import { NextRequest, NextResponse } from "next/server";
import { createPublicClient, http } from "viem";
import { polygonMumbai } from "viem/chains";
import prisma from "@/app/libs/prismaDb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function PATCH(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("No User Session found");
  }

  const {email, campaignId} = await req.json();
  
  if(email !== user.email) {
    throw new Error("User cannot verify other campaigns");
  }

  const campaign = await prisma.campaign.findUnique({
    where: { id: campaignId },
  });

  if(!campaign) {
    throw new Error("No such campaigns found");
  }
  const publicClient = createPublicClient({
    chain: polygonMumbai,
    transport: http(polygonMumbai.rpcUrls.public as unknown as string)
  })

  const transaction = await publicClient.getTransaction({ 
    hash: campaign.transactionHash as `0x${string}`
  });
  console.log("Campaign", campaign);
  console.log("Transaction:", transaction);

  return NextResponse.json({message: "Campaign Verified", campaign})
}