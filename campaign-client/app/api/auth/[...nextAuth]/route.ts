import bcrypt from "bcrypt";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import prisma from "@/app/libs/prismaDb";
import { ethers } from "ethers";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        type: { label: "type", type: "text" }, // Can be either web2 or web3
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
        walletAddress: { label: "walletAddress", type: "text" },
        message: { label: "message", type: "text" },
        signedMessage: { label: "signedMessage", type: "text" },
      },
      async authorize(credentials) {
        if (
          !credentials?.type ||
          (credentials?.type !== "web2" && credentials?.type !== "web3")
        ) {
          throw new Error("Must Specify Type of Login");
        }
        if (credentials?.type === "web2") {
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Invalid credentials");
          }

          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email,
            },
          });

          if (!user || !user?.hashedPassword) {
            throw new Error("Invalid credentials");
          }

          const isCorrectPassword = await bcrypt.compare(
            credentials.password,
            user.hashedPassword
          );

          if (!isCorrectPassword) {
            throw new Error("Invalid credentials");
          }

          return user;
        } else {
          if (!credentials?.walletAddress || !credentials?.signedMessage) {
            throw new Error("Invalid credentials");
          }

          const user = await prisma.user.findUnique({
            where: {
              walletAddress: credentials.walletAddress,
            },
          });

          

          if (!user) {
            throw new Error("Invalid credentials");
          }
          const signer = ethers.utils.verifyMessage(process.env.NEXT_PUBLIC_LOGIN_MESSAGE, credentials.signedMessage)

          if (signer !== credentials.walletAddress) {
            throw new Error("Invalid Signature");
          }
          const {hashedPassword, ...otherResults} = user;

          return {...otherResults};
        }
      },
    }),
  ],
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
