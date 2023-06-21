"use client";
import axios from "axios";
import React from "react";
import { useSession } from "next-auth/react";

type VerifyButtonClientProps = {
  campaignId: string
}

const VerifyButtonClient = async ({campaignId} : VerifyButtonClientProps) => {
  const {data:session} = useSession();
  const handleVerification = async () => {
    const response = await axios.patch('/api/campaign/verify', {
      email: session?.user?.email,
      campaignId: campaignId
    });
    console.log("Verification status result", response);
  }

  return (
    <button className="mt-6 border text-green-200 p-1 rounded-lg hover:bg-green-800 hover:text-white" onClick={handleVerification}>
      Verify Now
    </button>
  );
};

export default VerifyButtonClient;
