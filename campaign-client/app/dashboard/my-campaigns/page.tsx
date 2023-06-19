import getUserCampaigns from "@/app/actions/getUserCampaigns";
import CampaignCards from "@/app/components/CampaignCards";
import VerifyButtonClient from "@/app/components/VerifyButtonClient";
import Link from "next/link";
import React from "react";

const UserCampaignsPage = async () => {
  const user = await getUserCampaigns();
  return (
    <>
      <h1 className="mt-6 text-center text-5xl font-bold tracking-tight text-gray-500">
        <span className="text-pink-400">Your</span> Campaigns
      </h1>
      <nav className="mt-8 text-gray-400 hover:text-gray-200">
        <Link href="/dashboard">
          <p>{`<`} Back to Your Dashboard</p>
        </Link>
      </nav>
      {user?.campaignsCreated && user?.campaignsCreated?.length === 0 && (
        <div className="w-full flex flex-col">
          <h2 className="mt-4 text-center text-3xl font-bold text-gray-200">
            No Campaign <span className="text-pink-300">Yet?</span>
          </h2>
          <h3 className="mt-4 text-center text-2xl text-gray-200">
            Get busy already!
          </h3>
        </div>
      )}
      <main className="mt-2 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {user?.campaignsCreated &&
          user?.campaignsCreated?.length > 0 &&
          user?.campaignsCreated?.map((campaign, idx) => (
            <div
              className="flex flex-col items-center justify-center"
              key={`userCampaign${idx}`}
            >
              <CampaignCards
                link={`/campaigns/campaign/${encodeURIComponent(campaign.id)}`}
              >
                <h4
                  className="ml-6 text-xl font-bold tracking-tight text-gray-400"
                  title={campaign.topic}
                >
                  {`${campaign.topic.slice(0, 15)}${
                    campaign.topic.length > 14 ? "..." : ""
                  }`}
                </h4>
                <div className="font-bold text-gray-400">
                  <p className="my-2">
                    Verified:{" "}
                    {campaign.verifiedCampaign ? (
                      <span className="font-bold text-green-500">{"Yes"}</span>
                    ) : (
                      <span className="font-bold text-red-500">{"No"}</span>
                    )}
                  </p>
                  <p className="my-2">
                    Created At:{" "}
                    <span className="font-normal text-gray-50">
                      {campaign.createdAt.toDateString()}
                    </span>
                  </p>
                  <p className="my-2">
                    Ends At:{" "}
                    <span className="font-normal text-gray-50">
                      {campaign.endTime.toDateString()}
                    </span>
                  </p>
                </div>
              </CampaignCards>
              {!campaign.verifiedCampaign && (
                <VerifyButtonClient campaignId={campaign.id}/>
              )}
            </div>
          ))}
      </main>
    </>
  );
};

export default UserCampaignsPage;
