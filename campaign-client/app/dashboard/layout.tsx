"use client";
import { WagmiConfig } from "wagmi";
import { config } from "../libs/wagmi";
import { StyledDrawer } from "../components/StyledDrawer";

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
      <StyledDrawer>{children}</StyledDrawer>

  );
}
