"use client";
import React, { useTransition } from "react";

type VerifyButtonClientProps = {
  verifyCampaignServerAction: () => void;
};

const VerifyButtonClient = async ({
  verifyCampaignServerAction,
}: VerifyButtonClientProps) => {
  let [isPending, startTransition] = useTransition();

  return (
    <button
      className="mt-6 border text-green-200 p-1 rounded-lg hover:bg-green-800 hover:text-white"
      onClick={() => startTransition(() => verifyCampaignServerAction())}
    >
      Verify Now
    </button>
  );
};

export default VerifyButtonClient;
