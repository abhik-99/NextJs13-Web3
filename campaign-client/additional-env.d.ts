declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production";
      NEXTAUTH_SECRET: string;
      DATABASE_URL: string;
      ALCHEMY_API: string;
      OWNER_PRIV_KEY: string;
      NONCE_DOC_ID: string;
      NEXT_PUBLIC_SIGNUP_MESSAGE: string;
      NEXT_PUBLIC_LOGIN_MESSAGE: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
