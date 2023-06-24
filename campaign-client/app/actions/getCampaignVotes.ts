import prisma from "@/app/libs/prismaDb";

export async function getCampaignVotes(id: string) {

  const votes = await prisma.votes.findMany({
    where: {
      campaign: {
        contractCampaignId: id
      }
    }
  });
  
  return votes;

}