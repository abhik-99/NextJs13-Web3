"use client";
import React, { useState } from "react";
import BlueButtonClient from "../components/BlueButtonClient";
import PasswordInputClient from "../components/PasswordInputClient";
import StyledInputClient from "../components/StyledInputClient";

const SignUpPage = () => {
  const [connected, setConnected] = useState(false);
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="h-96 border-2 border-solid border-slate-600 p-10">
        <h1>Connect Wallet to Continue</h1>
        {!connected && (
          <BlueButtonClient onClick={() => setConnected(true)}>
            Connect Wallet
          </BlueButtonClient>
        )}
        {connected && (
          <form onSubmit={handleSubmit}>
          <div>
              <StyledInputClient placeholder="Name" />
              <StyledInputClient placeholder="Email" type="email" />
              <PasswordInputClient />
            </div>
            <div>
              <BlueButtonClient>
                {" "}
                Submit
              </BlueButtonClient>
            </div>
          </form>
        )}
      </div>
    </main>
  );
};

export default SignUpPage;
