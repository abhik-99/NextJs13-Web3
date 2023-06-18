import Link from "next/link";
import { DrawerToggleButton } from "./components/StyledDrawer";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-2">
      <h1>Hello Campaign</h1>
      <div className="flex items-center justify-center p-20">
      <button className="mr-4"><Link href="/campaigns">View Campaigns</Link></button>
      <button><Link href="/auth">Get Started</Link></button>
      <DrawerToggleButton />
      </div>
      
    </main>
  )
}
