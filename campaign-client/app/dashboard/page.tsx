import Image from "next/image";
import React from "react";

const UserDashboardPage = () => {
  return (
    <div className="container mx-auto">
      <h1
        className="
        my-10 
        text-center 
        text-6xl 
        font-bold 
        tracking-tight 
        text-gray-400"
      >
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
      <main className="px-2 md:px-0 w-full md:w-4/5 lg:w-2/3 mt-16">
        <div className="min-w-full bg-gray-700">
          Hello
        </div>
      </main>
      </div>
    </div>
  );
};

export default UserDashboardPage;
