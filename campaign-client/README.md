# Campaign Frontend

At its core, this is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

You first need to deploy the contract and have a mongoDB instance provisioned. The private key of the owner wallet address will be recorded. There are no worries as this private key is not exposed on the browser. To run the app, please open the project and run the following commands:
1. Run `npm i`
2. Once the above completes, copy the `.env.example` and fill in your respective values in a new `.env` created as a copy of the example file. *Note: Nonce document id comes after step 5*
3. Run `prisma db push`. This will push the changes to DB and generate client.
4. Go to your MongoDB Explorer and enter a doc in the `nonce` collection with a value.
5. Copy Document ID of the Nonce doc your just created in the `nonce` collection in your environment file.
6. Now run `npm run dev` and your app will be running on `localhost:3000`.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
