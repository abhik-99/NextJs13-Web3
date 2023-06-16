import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

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
    <html lang="en">
      <body className={inter.className}>
        <div className="container mx-auto flex min-h-screen flex-col items-center justify-center">
          {children}
        </div>
      </body>
    </html>
  );
}
