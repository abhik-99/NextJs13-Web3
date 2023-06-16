import { NextResponse } from "next/server";

export async function GET(req: Request) {
  console.log("Hit", req);
  return NextResponse.json({message: "hit"})
}