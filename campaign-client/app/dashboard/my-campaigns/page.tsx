import CampaignCards from "@/app/components/CampaignCards";
import Link from "next/link";
import React from "react";

const UserCampaignsPage = () => {
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
        <span className="text-pink-400">Your</span> Campaigns
      </h1>
      <nav className="mt-8 text-gray-400 hover:text-gray-200">
        <Link href="/dashboard">
          <p>{`<`} Back to Your Dashboard</p>
        </Link>
      </nav>
      <main className="mt-2 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4, 5, 6, 7].map((i) => (
          <CampaignCards link={`/campaigns/${encodeURIComponent(i)}`}>
            <h4
              className="ml-6 text-2xl 
            font-bold 
            tracking-tight 
            text-gray-400"
            >
              Campaign Topic
            </h4>
            <p>Creator: Creator Address Here</p>
            <p>Created At: Time</p>
          </CampaignCards>
        ))}
      </main>
    </>
  );
};

export default UserCampaignsPage;
