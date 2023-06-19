import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/libs/prismaDb";

export async function PATCH(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("No User Session found");
  }
  const { email, campaignId } = await req.json();

  if (user.email !== email) {
    throw new Error("User can only verify their own campaigns");
  }

  const campaign = await prisma.campaign.findUnique({
    where: { id: campaignId },
  });

  if(!campaign) {
    throw new Error("No such campaigns found");
  }

  return NextResponse.json({ status: "success", campaign });
}
