"use client";
import { WagmiConfig } from "wagmi";
import { config } from "../libs/wagmi";


export const metadata = {
  title: "Login/Signup",
  description: "Get Started with your Campaigns",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <WagmiConfig config={config}>{children}</WagmiConfig>;
}
