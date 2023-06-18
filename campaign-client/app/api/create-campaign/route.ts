import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import prisma from "@/app/libs/prismaDb";
import { ethers } from "ethers";

import contractAbi from "@/app/blockchain/contract_abi.json";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    throw new Error("Unauthorised");
  }
  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email as string,
    },
  });

  const nonce = await prisma?.nonce.update({
    where: { id: process.env.NONCE_DOC_ID },
    data: { value: { increment: 1 } },
  });

  const ownerWallet = new ethers.Wallet(process.env.OWNER_PRIV_KEY);
  const eat = Math.trunc((Date.now().valueOf()/1000) + 60 * 60 * 100)
  console.log("EAT", eat);

  const hash = ethers.utils.solidityKeccak256(
    ["address", "uint", "uint"],
    [user?.walletAddress, eat, nonce?.value]
  );

  const byteHash = ethers.utils.arrayify(hash);
  const signedMessage = await ownerWallet.signMessage(byteHash);

  const body = await req.json();
  const { topic, option1, option2, option3, option4, startDate, endDate } =
    body;
  // const campaignContract = new ethers.Contract(
  //   process.env.DEPLOYED_CONTRACT_ADDRESS,
  //   contractAbi,
  // );
  return NextResponse.json({
    signedMessage,
    eat,
    nonce: nonce.value,
  });
}
