"use client";

import WagmiContext from "@/app/context/WagmiContext";
import { config } from "@/app/libs/wagmi";
import { WagmiConfig } from "wagmi";

export const metadata = {
  title: "Sadda Dashboard",
  description: "Dashboard to launch revolutions",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <WagmiConfig config={config}>
      {children}
    </WagmiConfig>
  );
}
