import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismaDb";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params: { id } }: { params: { id: string } }
) {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("No User Session");
  }

  const campaign = await prisma.campaign.findUnique({
    where: {
      contractCampaignId: id!,
    },
    include: {
      votes: {
        select: {
          option: true,
          createdAt: true,
          voter: {
            select: {
              name: true,
              walletAddress: true,
            },
          },
        },
      },
      creator: {
        select: {
          name: true,
          walletAddress: true,
        },
      },
    },
  });

  if (!campaign || !campaign.verifiedCampaign) {
    throw new Error("No Campaign Found");
  }
  return NextResponse.json(campaign);
}
