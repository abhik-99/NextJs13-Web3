import React from "react";
import HorizontalCards from "../components/HorizontalCards";
import { DrawerToggleButton } from "../components/StyledDrawer";

const CampaignsRootPage = () => {
  return (
    <>
      <h1
        className="
            py-10 
            text-center 
            text-6xl 
            font-bold 
            tracking-tight 
            text-gray-500
          "
      >
        Find what you <span className="text-blue-200">Seek</span>
      </h1>
      <DrawerToggleButton />
      <main className="flex flex-col items-center justify-evenly">
        <HorizontalCards
          img="https://images.unsplash.com/photo-1563089145-599997674d42?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
          alt="open campaigns"
          heading="Open Campaigns"
          body="Vote in these"
          link="/campaigns/open"
        />
        <HorizontalCards
          img="https://images.unsplash.com/photo-1620503374956-c942862f0372?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
          alt="closed campaigns"
          heading="Closed Campaigns"
          body="Where our history lies"
          link="/campaigns/past"
          reversed
        />
      </main>
    </>
  );
};

export default CampaignsRootPage;
