import CampaignCards from "@/app/components/CampaignCards";
import React from "react";

const OpenCampaignsPage = () => {
  return (
    <>
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
        <span className="text-cyan-200">Open</span> Campaigns
      </h1>
      <main className="mt-10 px-2 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4, 5, 6, 7].map((i) => (
          <CampaignCards link={`/campaigns/${encodeURIComponent(i)}`}>
            <h4 className="ml-6 text-2xl 
            font-bold 
            tracking-tight 
            text-gray-400">Campaign Topic</h4>
            <p>Creator: Creator Address Here</p>
            <p>Created At: Time</p>
          </CampaignCards>
        ))}
      </main>
    </>
  );
};

export default OpenCampaignsPage;
