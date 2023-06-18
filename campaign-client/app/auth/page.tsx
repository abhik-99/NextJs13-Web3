"use client";
import React, { useState } from "react";
import StyledButtonClient from "../components/StyledButtonClient";
import StyledInputClient from "../components/StyledInputClient";
import { ErrorMessage, Form, Formik } from "formik";
import {
  TabBodyClient,
  TabClient,
  TabsPanelClient,
} from "../components/TabsClient";
import axios from "axios";

import { useAccount, useConnect, useSignMessage } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { toast } from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { polygonMumbai } from "viem/chains";

const SignUpPage = () => {
  const session = useSession();
  const router = useRouter();
  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const { address: account, isConnected } = useAccount();
  const {
    data: signedSignupMessage,
    isSuccess: hasSignedSuccessfully,
    signMessage: signSignUpMessage,
  } = useSignMessage({
    message: process.env.NEXT_PUBLIC_SIGNUP_MESSAGE,
  });

  const {
    data: signedLoginMessage,
    isSuccess: hasSignedLoginSuccessfully,
    signMessage: signLoginMessage,
  } = useSignMessage({
    message: process.env.NEXT_PUBLIC_LOGIN_MESSAGE,
  });

  const { connect, connectAsync } = useConnect({
    connector: new InjectedConnector({
      chains: [polygonMumbai],
    }),
  });
  const [value, setValue] = useState(0);

  React.useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/dashboard");
    }
  }, [session?.status]);

  const handleConnectWalletLogin = () => {
    try {
      connect();
      toast.loading("Please sign the message to continue", {
        duration: 6000,
      });
    } catch (error) {
      console.log("Error occurec", error);
      toast.error("Something went wrong while connecting wallet");
    }
  };

  const handleWeb3Login = () => {
    signLoginMessage();
  };

  React.useEffect(() => {
    signIn("credentials", {
      type: "web3",
      walletAddress: account,
      signedMessage: signedLoginMessage,
      redirect: false,
    }).then((callback) => {
      if (callback?.error) {
        console.log("Callback error", callback.error);
        toast.error("Incorrect Wallet Credentials");
      }

      if (callback?.ok && !callback?.error) {
        toast.success("Web3 Login Successful");
        router.push("/dashboard");
      }
    });
  }, [hasSignedLoginSuccessfully]);

  const handleWeb3Signup = async () => {
    connectAsync().then(() => {
      toast.loading("Please sign the message to continue", { duration: 6000 });
      signSignUpMessage();
    });
  };

  const handleSubmit = (values: any, { setSubmitting }: any, type: string) => {
    setSubmitting(false);
    console.log("Values", type, {
      ...values,
      walletAddress: account,
      message: process.env.NEXT_PUBLIC_SIGNUP_MESSAGE,
      signedSignupMessage,
    });

    if (type === "SIGNUP" && hasSignedSuccessfully) {
      axios
        .post("/api/signup", {
          ...values,
          walletAddress: account,
          message: process.env.NEXT_PUBLIC_SIGNUP_MESSAGE,
          signedSignupMessage,
        })
        .then(() => {
          setSignUpSuccess(true);
          toast.success("Signup success, Login");
          signIn("credentials", {
            type: "web2",
            email: values.email,
            password: values.password,
          });
        })
        .catch(() => toast.error("Something went wrong!"));
    }
    if (type === "LOGIN") {
      signIn("credentials", {
        type: "web2",
        email: values.email,
        password: values.password,
        redirect: false,
      }).then((callback) => {
        if (callback?.error) {
          toast.error("Incorrect Credentials");
        }

        if (callback?.ok && !callback?.error) {
          toast.success("Web2 Login Successful");
          router.push("/dashboard");
        }
      });
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="my-4 text-center text-3xl font-bold tracking-tight text-gray-600">
        Connect to Your <span className="text-blue-400">Campaigners</span>
      </h1>
      <div className="min-h-max bg-gray-900 rounded-md border-2 border-solid border-slate-600 p-10">
        <TabsPanelClient>
          <TabClient
            value={value}
            index={0}
            name="Login"
            onClick={() => setValue(0)}
          />
          <TabClient
            value={value}
            index={1}
            name="Signup"
            onClick={() => setValue(1)}
          />
        </TabsPanelClient>

        <TabBodyClient value={value} index={0}>
          {!isConnected && (
            <StyledButtonClient onClick={handleConnectWalletLogin} fullWidth>
              Connect Wallet
            </StyledButtonClient>
          )}
          {isConnected && (
            <StyledButtonClient
              onClick={handleWeb3Login}
              fullWidth
              color="yellow"
            >
              Sign Message to Login
            </StyledButtonClient>
          )}
          <div className="my-6">
            <div className="relative">
              <div
                className="
                absolute 
                inset-0 
                flex 
                items-center
              "
              >
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-gray-600 px-2 rounded-full">
                  Or continue with
                </span>
              </div>
            </div>
          </div>
          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={(values, formikHelpers) =>
              handleSubmit(values, formikHelpers, "LOGIN")
            }
            validate={(values) => {
              const errors: any = {};

              if (!values.email) {
                errors.email = "*Required";
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = "Invalid email address";
              }
              if (!values.password) {
                errors.password = "*Required";
              }
              return errors;
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="flex flex-col items-center justify-center">
                  <StyledInputClient
                    type="email"
                    name="email"
                    placeholder="Enter email address"
                  />

                  <StyledInputClient
                    type="password"
                    name="password"
                    placeholder="And password here..."
                  />
                  <span className="my-2" />
                  <StyledButtonClient type="submit" disabled={isSubmitting}>
                    Submit
                  </StyledButtonClient>
                </div>
              </Form>
            )}
          </Formik>
        </TabBodyClient>
        <TabBodyClient value={value} index={1}>
          {!isConnected && (
            <>
              <StyledButtonClient
                onClick={handleWeb3Signup}
                disabled={signUpSuccess}
              >
                Connect Wallet
              </StyledButtonClient>
            </>
          )}
          {isConnected && (
            <>
              <h2 className="my-4 text-center text-xl text-gray-400">
                Welcome{" "}
                <span className="text-cyan-300 font-bold">{`${account?.slice(
                  0,
                  5
                )}...${account?.slice(
                  account?.length - 2,
                  account?.length
                )}`}</span>
              </h2>
              <Formik
                initialValues={{ name: "", email: "", password: "" }}
                onSubmit={(values, formikHelpers) =>
                  handleSubmit(values, formikHelpers, "SIGNUP")
                }
                validate={(values) => {
                  const errors: any = {};
                  if (!values.name) {
                    errors.name = "*Required";
                  }

                  if (!values.email) {
                    errors.email = "*Required";
                  } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                      values.email
                    )
                  ) {
                    errors.email = "Invalid email address";
                  }
                  if (!values.password) {
                    errors.password = "*Required";
                  }
                  return errors;
                }}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <div className="flex flex-col items-start justify-center">
                      <StyledInputClient
                        type="text"
                        name="name"
                        placeholder="Enter your fullname"
                      />
                      <span className="my-1" />
                      <StyledInputClient
                        type="email"
                        name="email"
                        placeholder="Enter email address"
                      />
                      <span className="my-1" />
                      <StyledInputClient
                        type="password"
                        name="password"
                        placeholder="And password here..."
                      />
                      <span className="my-3" />
                      <StyledButtonClient
                        type="submit"
                        disabled={
                          isSubmitting ||
                          !hasSignedSuccessfully ||
                          signUpSuccess
                        }
                        fullWidth
                      >
                        Submit
                      </StyledButtonClient>
                    </div>
                  </Form>
                )}
              </Formik>
            </>
          )}
        </TabBodyClient>
      </div>
    </main>
  );
};

export default SignUpPage;
