import prisma from "@/app/libs/prismaDb";

export async function getOpenCampaigns() {
  const campaigns = await prisma.campaign.findMany({
    where: {
      AND: [
        {
          endTime: {
            gt: new Date(),
          },
        },
        {
          verifiedCampaign: true,
        },
      ],
    },
    include: {
      creator: {
        select: {
          name: true,
          walletAddress: true,
        },
      },
    },
    orderBy: {
      endTime: "desc",
    },
  });
  return campaigns;
}
