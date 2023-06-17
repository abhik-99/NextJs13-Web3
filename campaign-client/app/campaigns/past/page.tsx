import CampaignCards from "@/app/components/CampaignCards";
import React from "react";

const PastCampaignsPage = () => {
  return (
    <main>
      <h1
        className="
          mt-6 
          text-center 
          text-5xl 
          font-bold 
          tracking-tight 
          text-gray-500
        "
      >
        <span className="text-red-200">Past</span> Campaigns
      </h1>
      <main className="mt-10 px-2 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4, 5, 6, 7].map((i) => (
          <CampaignCards link={`/campaigns/${encodeURIComponent(i)}`} reverseGradient />
        ))}
      </main>
    </main>
  );
};

export default PastCampaignsPage;
