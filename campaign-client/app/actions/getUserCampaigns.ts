import prisma from "@/app/libs/prismaDb";
import getSession from "./getSession";

const getUserCampaigns = async () => {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      },
      include: {
        campaignsCreated: true,
      },
    });

    if (!currentUser?.campaignsCreated) {
      return null;
    }

    return currentUser;
  } catch (error: any) {
    return null;
  }
};

export default getUserCampaigns;
