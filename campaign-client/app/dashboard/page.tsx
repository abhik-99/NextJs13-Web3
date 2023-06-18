import Image from "next/image";
import React from "react";
import StyledButtonClient from "../components/StyledButtonClient";

import { BiEditAlt } from "react-icons/bi";
import Link from "next/link";
import { DrawerToggleButton } from "../components/StyledDrawer";
import getCurrentUser from "../actions/getCurrentUser";

const UserDashboardPage = async () => {
  const user = await getCurrentUser();
  return (
    <div className="container mx-auto">
      <h1 className="my-10 text-center text-6xl font-bold tracking-tight text-gray-400">
        <span className="text-green-300">Your</span> Dashboard
      </h1>
      <div className="pl-4">
        <DrawerToggleButton />
      </div>
      <div className="w-full flex flex-col items-center justify-center">
        <Image
          src="/homer-outline-invert.png"
          width="300"
          height="500"
          alt="Homer's Dashboard"
          className="rounded-full"
        />
        <main className="p-2 w-full md:w-4/5 lg:w-2/3 mt-16 rounded-md border border-gray-500">
          <div className="p-2 min-w-full bg-gray-700 rounded-md grid grid-cols-1 md:grid-cols-2">
            <div className="w-full text-gray-400 text-sm font-bold">
              <div className="flex items-center justify-between">
                <h2 className="-m-1 text-3xl font-bold tracking-tight text-gray-300">
                  Your <span className="text-cyan-200">Details</span>
                </h2>
                <button
                  title="Feature Not implemented"
                  className="p-1 border border-gray-300 rounded-lg"
                >
                  <BiEditAlt />
                </button>
              </div>
              <p className="mt-2 mb-1">
                Name:{" "}
                <span className="text-base text-gray-300 font-medium">
                  {user?.name}
                </span>{" "}
              </p>
              <p className="my-1">
                Email:{" "}
                <span className="text-base text-gray-300 font-medium">
                  {user?.email}
                </span>
              </p>
              <p className="my-1">
                Wallet Address:{" "}
                <span
                  className="text-base text-gray-300 font-medium"
                  title={user?.walletAddress}
                >{`${user?.walletAddress.slice(
                  0,
                  7
                )}...${user?.walletAddress.slice(
                  user?.walletAddress.length - 5,
                  user?.walletAddress.length
                )}`}</span>
              </p>
              <p className="my-1">
                Joined On:{" "}
                <span className="text-base text-gray-300 font-medium">
                  {user?.createdAt.toDateString()}
                </span>
              </p>
              <p className="my-1">Campaigns Created: <span className="text-base text-gray-300 font-medium">{user?._count.campaignsCreated}</span></p>
              <p className="my-1">Campaigns Participated: <span className="text-base text-gray-300 font-medium">{user?._count.campaignsVoted}</span></p>
            </div>
            <div className="w-full flex flex-col items-center justify-evenly pt-5 md:pl-3 md:pt-2">
              <Link href="/dashboard/my-campaigns">
                <StyledButtonClient color="yellow">
                  My Campaigns
                </StyledButtonClient>
              </Link>
              <Link href="/dashboard/create-campaign">
                <StyledButtonClient color="green">
                  Create Campaign
                </StyledButtonClient>
              </Link>

              <StyledButtonClient title="Feature Not Implemented">
                Your History
              </StyledButtonClient>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserDashboardPage;
