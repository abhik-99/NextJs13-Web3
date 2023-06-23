import { getCampaignVotes } from "@/app/actions/getCampaignVotes";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params: { id } }: { params: { id: string } }
) {
  const user = await getCurrentUser();
  if(!user) {
    throw new Error("No User Sessions found");
  }
  const votes = await getCampaignVotes(id);

  console.log("Votes gathered",votes)
  return NextResponse.json(votes);
}
