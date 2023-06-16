"use client";
import React, { useState } from "react";
import BlueButtonClient from "../components/BlueButtonClient";
import StyledInputClient from "../components/StyledInputClient";
import { ErrorMessage, Form, Formik } from "formik";

const SignUpPage = () => {
  const [connected, setConnected] = useState(false);

  const handleSubmit = (values: any, { setSubmitting }: any) => {
    setSubmitting(false);
    console.log("Values", values);
  }
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
          <Formik
            initialValues={{ fullname: "", email: "", password: "" }}
            onSubmit={handleSubmit}
            validate={(values) => {
              const errors: any = {};
              if (!values.fullname) {
                errors.fullname = "*Required";
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
                  name="fullname"
                  placeholder="Enter your fullname"
                />
                <ErrorMessage name="fullname" component="div" />

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
      </div>
    </main>
  );
};

export default SignUpPage;
