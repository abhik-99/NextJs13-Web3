"use client";
import { StyledDrawer } from "../components/StyledDrawer";
import WagmiContext from "../context/WagmiContext";

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
    <WagmiContext>
      <StyledDrawer>{children}</StyledDrawer>
    </WagmiContext>
  );
}
