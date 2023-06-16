import bcrypt from "bcrypt";

import prisma from "@/app/libs/prismaDb";
import { NextResponse } from "next/server";
import { recoverAddress } from "ethers";

export async function POST(
  request: Request
) {
  const body = await request.json();
  const {
    email,
    name,
    password,
    walletAddress,
    message,
    signedMessage
  } = body;
  
  const signer = recoverAddress(message, signedMessage)
  if(signer !== walletAddress){
    throw new Error("Invalid Signature");
  }
  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: {
      email,
      name,
      hashedPassword,
      walletAddress
    }
  });

  return NextResponse.json(user);
}