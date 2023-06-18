"use client";
import { WagmiConfig } from "wagmi";
import { config } from "../libs/wagmi";

export interface WagmiContextProps {
  children: React.ReactNode;
}

export default function WagmiContext({ children }: WagmiContextProps) {
  return <WagmiConfig config={config}>{children}</WagmiConfig>;
}