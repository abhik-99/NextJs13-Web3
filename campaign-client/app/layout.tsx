import {StyledDrawer} from "./components/StyledDrawer";
import AuthContext from "./context/AuthContext";
import { DrawerContextProvider } from "./context/DrawerContext";
import ToasterContext from "./context/ToasterContext";
import "./globals.css";
import { Inter } from "next/font/google";
import cx from "classnames";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Sadda Web3 Haq",
  description: "A simple Campaign App powered by Web3",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cx(inter.className, "min-h-screen")}>
        <AuthContext>
          <ToasterContext />
          <DrawerContextProvider>
            <StyledDrawer>{children}</StyledDrawer>
          </DrawerContextProvider>
        </AuthContext>
      </body>
    </html>
  );
}
