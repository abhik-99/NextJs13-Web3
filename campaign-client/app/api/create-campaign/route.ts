import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import prisma from "@/app/libs/prismaDb";
import axios from "axios";
import { ethers } from "ethers";

export async function POST(req: Request) {

  const session = await getServerSession(authOptions);

  if(!session?.user) {
    throw new Error("Unauthorised");
  }
  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email as string,
    },
  });

  const nonce = await prisma?.nonce.update({
    where: { id: process.env.NONCE_DOC_ID },
    data: { value: { increment: 1 } }
  });

  const ownerWallet = new ethers.Wallet(process.env.OWNER_PRIV_KEY);

  const hash = ethers.utils.solidityKeccak256(
    ["address", "uint", "uint"],
    [user?.walletAddress, Date.now().valueOf() + 60*60*100,nonce?.value]
  );

  const byteHash = ethers.utils.arrayify(hash);
  const signedMessage = ownerWallet.signMessage(byteHash)

  const body = await req.json();
  const { topic, option1, option2, option3, option4, startDate, endDate } =
    body;
  return NextResponse.json({ message: "hit" });
}
