'use client'
import { Inter } from "next/font/google";
import { WagmiConfig } from "wagmi";
import { config } from "../libs/wagmi";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Login/Signup",
  description: "Get Started with your Campaigns",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WagmiConfig config={config}>{children}</WagmiConfig>
      </body>
    </html>
  );
}
