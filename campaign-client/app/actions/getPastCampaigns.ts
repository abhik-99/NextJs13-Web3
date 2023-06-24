import prisma from "@/app/libs/prismaDb";

export async function getPastCampaigns() {
  const campaigns = await prisma.campaign.findMany({
    where: {
      AND: [
        {
          endTime: {
            lt: new Date(),
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
