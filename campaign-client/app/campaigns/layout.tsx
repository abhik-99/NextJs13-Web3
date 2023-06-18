"use client";
import { WagmiConfig } from "wagmi";
import { StyledDrawer } from "../components/StyledDrawer";
import { config } from "../libs/wagmi";

export const metadata = {
  title: "Campaigns - Sadda Web3 Haq",
  description: "View what people have been upto...",
};

export default function CampaignsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <WagmiConfig config={config}>
      <StyledDrawer>
        <div className="container mx-auto min-h-screen">{children}</div>
      </StyledDrawer>
    </WagmiConfig>
  );
}
