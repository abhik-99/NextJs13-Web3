"use client";
import axios from "axios";
import React from "react";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

type VerifyButtonClientProps = {
  campaignId: string
}

const VerifyButtonClient = async ({campaignId} : VerifyButtonClientProps) => {
  const {data:session} = useSession();
  const handleVerification = async () => {
    try{

      const response = await axios.patch('/api/campaign/verify', {
        email: session?.user?.email,
        campaignId: campaignId
      });
      console.log("Response Received", response);
      toast.success("Campaign verified successfully");
    } catch(e) {
      console.log("Error Occurred while verifying", e);
      toast.error("Something went wrong");
    }
  }

  return (
    <button className="mt-6 border text-green-200 p-1 rounded-lg hover:bg-green-800 hover:text-white" onClick={handleVerification}>
      Verify Now
    </button>
  );
};

export default VerifyButtonClient;
