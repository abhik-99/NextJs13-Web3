import Image from "next/image";
import React from "react";
import StyledButtonClient from "../components/StyledButtonClient";

import { BiEditAlt } from "react-icons/bi";
import Link from "next/link";
const UserDashboardPage = () => {
  return (
    <div className="container mx-auto">
      <h1 className="my-10 text-center text-6xl font-bold tracking-tight text-gray-400">
        <span className="text-green-300">Your</span> Dashboard
      </h1>
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
            <div className="w-full">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight text-gray-300">
                  Your <span className="text-cyan-200">Details</span>
                </h2>
                <button title="Feature Not implemented">
                  <BiEditAlt />
                </button>
              </div>
              <p>Name:</p>
              <p>Email:</p>
              <p>Wallet Address:</p>
              <p>Joined On:</p>
              <p>Campaigns Created</p>
            </div>
            <div className="w-full flex flex-col items-center justify-evenly pt-5 md:pl-3 md:pt-2">
              <Link href="/dashboard/my-campaigns">
                <StyledButtonClient color="yellow" >
                  My Campaigns
                </StyledButtonClient>
              </Link>
              <Link href="/dashboard/create-campaign">
                <StyledButtonClient color="green">
                  Create Campaign
                </StyledButtonClient>
              </Link>

              <StyledButtonClient>Your History</StyledButtonClient>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserDashboardPage;
