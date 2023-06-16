"use client";
import React, { useState } from "react";
import BlueButtonClient from "../components/BlueButtonClient";
import StyledInputClient from "../components/StyledInputClient";
import { ErrorMessage, Form, Formik } from "formik";
import {
  TabBodyClient,
  TabClient,
  TabsPanelClient,
} from "../components/TabsClient";
import axios from "axios";

const SignUpPage = () => {
  const [connected, setConnected] = useState(false);
  const [value, setValue] = useState(0);

  const handleSubmit = (values: any, { setSubmitting }: any, type: string) => {
    setSubmitting(false);
    console.log("Values", type, values);
    if (type === "SIGNUP") {
      axios.post("/api/signup", {
        ...values,
        walletAddress: "",
        message: "",
        signedMessage: "",
      });
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1
        className="
            my-4 
            text-center 
            text-3xl 
            font-bold 
            tracking-tight 
            text-gray-600
          "
      >
        Connect to Your <span className="text-blue-400">Campaigners</span>
      </h1>
      <div className="h-96  border-2 border-solid border-slate-600 p-10">
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
          <BlueButtonClient onClick={() => setConnected(true)}>
            Connect Wallet
          </BlueButtonClient>
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
                <span className="bg-gray-600 px-2">Or continue with</span>
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
                <StyledInputClient
                  type="email"
                  name="email"
                  placeholder="Enter email address"
                />
                <ErrorMessage name="email" component="div" />

                <StyledInputClient
                  type="password"
                  name="password"
                  placeholder="And password here..."
                />
                <ErrorMessage name="password" component="div" />

                <BlueButtonClient type="submit" disabled={isSubmitting}>
                  Submit
                </BlueButtonClient>
              </Form>
            )}
          </Formik>
        </TabBodyClient>
        <TabBodyClient value={value} index={1}>
          {!connected && (
            <BlueButtonClient onClick={() => setConnected((prev) => !prev)}>
              Connect Wallet
            </BlueButtonClient>
          )}
          {connected && (
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
                  <StyledInputClient
                    type="text"
                    name="name"
                    placeholder="Enter your fullname"
                  />
                  <ErrorMessage name="name" component="div" />

                  <StyledInputClient
                    type="email"
                    name="email"
                    placeholder="Enter email address"
                  />
                  <ErrorMessage name="email" component="div" />

                  <StyledInputClient
                    type="password"
                    name="password"
                    placeholder="And password here..."
                  />
                  <ErrorMessage name="password" component="div" />

                  <BlueButtonClient type="submit" disabled={isSubmitting}>
                    Submit
                  </BlueButtonClient>
                </Form>
              )}
            </Formik>
          )}
        </TabBodyClient>
      </div>
    </main>
  );
};

export default SignUpPage;
