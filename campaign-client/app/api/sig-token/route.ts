import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import {
  createWalletClient,
  encodePacked,
  http,
  keccak256,
} from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { polygonMumbai } from "viem/chains";

export async function GET() {

  const user = await getCurrentUser();
  if(!user){
    throw new Error("No User Session");
  }

  const eat = BigInt(Math.trunc(Date.now().valueOf() / 1000) + 60 * 60 );

  const nonce = await prisma?.nonce.update({
    where: { id: process.env.NONCE_DOC_ID },
    data: { value: { increment: 1 } },
  });
  const ownerAccount = privateKeyToAccount(`0x${process.env.OWNER_PRIV_KEY}`);
  const ownerWalletClient = createWalletClient({
    account: ownerAccount,
    transport: http(polygonMumbai.rpcUrls.public as unknown as string),
  });
  const sigHash = keccak256(
    encodePacked(
      ["address", "uint", "uint"],
      [
        user?.walletAddress as `0x${string}`,
        // userWalletAddress as `0x${string}`,
        eat,
        BigInt(nonce?.value as number),
      ]
    )
  );
  const signedMessage = await ownerWalletClient.signMessage({message: {raw: sigHash}})


  return NextResponse.json({ signedMessage, eat: eat.toString(), nonce: nonce?.value });
}
