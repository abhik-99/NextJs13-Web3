"use client"
import StyledButtonClient from "@/app/components/StyledButtonClient";
import StyledInputClient from "@/app/components/StyledInputClient";
import { ErrorMessage, Form, Formik } from "formik";
import React from "react";

const CreateNewCampaignPage = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="my-10 text-5xl font-bold tracking-tight text-gray-400">
        <span className="text-green-500">Create</span> New Campaign
      </h1>
      <main className="w-full max-w-sm p-4 rounded-lg shadow sm:p-6 md:p-8 bg-gray-900 border border-gray-600">
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={(values) => {
            console.log("Campaign to be created with values", values);
          }}
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

              <StyledButtonClient type="submit" disabled={isSubmitting}>
                Submit
              </StyledButtonClient>
            </Form>
          )}
        </Formik>
      </main>
    </div>
  );
};

export default CreateNewCampaignPage;
