import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import prisma from "@/app/libs/prismaDb";

import { createPublicClient, http } from "viem";
import { polygonMumbai } from "viem/chains";
import getCurrentUser from "@/app/actions/getCurrentUser";


export async function POST(req: Request) {
  const user = await getCurrentUser();
  if(!user){
    throw new Error("No User Session");
  }

  const body = await req.json();
  const {
    hash,
    topic,
    option1,
    option2,
    option3,
    option4,
    startDate,
    endDate,
  } = body;

  console.log("Body received", body);

  const publicClient = createPublicClient({
    chain: polygonMumbai,
    transport: http(polygonMumbai.rpcUrls.public as unknown as string),
  });

  await prisma.campaign.create({
    data: {
      creatorId: user.id,
      verified: false,
      transaction: hash,
      startTime: startDate,
      endTime: endDate,
      topic, 
      options: [option1, option3, option3, option4]
    }
  })

  return NextResponse.json({
    message: "Watching Transaction",
  });
}
