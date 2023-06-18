import getUserCampaigns from "@/app/actions/getUserCampaigns";
import CampaignCards from "@/app/components/CampaignCards";
import Link from "next/link";
import React from "react";

const UserCampaignsPage = async () => {
  const user = await getUserCampaigns();
  return (
    <>
      <h1
        className="mt-6 text-center text-5xl font-bold tracking-tight text-gray-500"
      >
        <span className="text-pink-400">Your</span> Campaigns
      </h1>
      <nav className="mt-8 text-gray-400 hover:text-gray-200">
        <Link href="/dashboard">
          <p>{`<`} Back to Your Dashboard</p>
        </Link>
      </nav>
      {user?.campaignsCreated && user?.campaignsCreated?.length === 0 &&
        <div className="w-full flex flex-col">
        <h2 className="mt-4 text-center text-3xl font-bold text-gray-200">No Campaign <span className="text-pink-300">Yet?</span></h2>
        <h3 className="mt-4 text-center text-2xl text-gray-200">Get busy already!</h3>
        </div>
        }
      <main className="mt-2 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        
        {user?.campaignsCreated && user?.campaignsCreated?.length > 0 &&
          user?.campaignsCreated?.map((campaign, idx) => (
            <CampaignCards
              link={`/campaigns/${encodeURIComponent(campaign.id)}`}
              key={`userCampaign${idx}`}
            >
              <h4
                className="ml-6 text-xl font-bold tracking-tight text-gray-400"
                title={campaign.topic}
              >
                {`${campaign.topic.slice(0, 15)}...`}
              </h4>
              <p title={user.name}>Creator Name: {user.name}</p>
              <p title={user.walletAddress}>
                Creator Address:{" "}
                {`${user?.walletAddress.slice(
                  0,
                  5
                )}...${user?.walletAddress.slice(
                  user?.walletAddress.length - 3,
                  user?.walletAddress.length
                )}`}
              </p>
              <p>Created At: {campaign.createdAt.toDateString()}</p>
              <p>Ends At: {campaign.endTime.toDateString()}</p>
            </CampaignCards>
          ))}
      </main>
    </>
  );
};

export default UserCampaignsPage;
