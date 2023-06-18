
export const metadata = {
  title: "Campaigns - Sadda Web3 Haq",
  description: "View what people have been upto...",
};

export default function CampaignsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="container mx-auto min-h-screen">{children}</div>;
}
