import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismaDb";

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


  const campaign = await prisma.campaign.create({
    data: {
      creator: {
        connect: {
          id: user.id
        }
      },
      verifiedCampaign: false,
      transactionHash: hash,
      startTime: startDate,
      endTime: endDate,
      topic, 
      options: [option1, option2, option3, option4]
    }
  })

  return NextResponse.json(campaign);
}
