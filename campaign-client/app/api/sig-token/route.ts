import { ethers } from "ethers";
import { NextRequest,NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  console.log("Hit")
  const { searchParams } = new URL(req.url)
  const userWalletAddress = searchParams.get('userWalletAddress')
  console.log("UWA r", userWalletAddress);
  const nonce = await prisma?.nonce.update({
    where: { id: process.env.NONCE_DOC_ID },
    data: { value: { increment: 1 } }
  });

  const ownerWallet = new ethers.Wallet(process.env.OWNER_PRIV_KEY);

  const hash = ethers.utils.solidityKeccak256(
    ["address", "uint", "uint"],
    [userWalletAddress, Date.now().valueOf() + 60*60*100,nonce?.value]
  );

  const byteHash = ethers.utils.arrayify(hash);
  const signedMessage = ownerWallet.signMessage(byteHash)
  return NextResponse.json({signedMessage})
}