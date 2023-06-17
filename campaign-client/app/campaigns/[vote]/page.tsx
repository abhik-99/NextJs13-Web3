"use client";
import StyledButtonClient from "@/app/components/StyledButtonClient";
import ProgressBarClient from "@/app/components/ProgressBarClient";
import StyledRadioOptionClient from "@/app/components/StyledRadioClient";
import { ErrorMessage, Form, Formik } from "formik";
import Link from "next/link";
import React from "react";

const VoteInCampaignPage = ({ params }: { params: { vote: string } }) => {
  const [submitted, setSubmitted] = React.useState(false);
  return (
    <div>
      <h1
        className="
        my-10 
            text-center 
            text-6xl 
            font-bold 
            tracking-tight 
            text-gray-500"
      >
        Campaign
      </h1>
      <nav className="m-2 text-gray-400">
        <Link href="/campaigns/open">
          <p>{`<`} Back to All Campaigns</p>
        </Link>
      </nav>
      <main className="m-2 min-w-full border border-gray-500 rounded-lg">
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          <div className="h-full w-full p-2 md:p-10 lg:p-15 flex flex-col items-start justify-center text-gray-300">
            <h2 className="my-5 text-3xl font-bold tracking-tight">
              Campaign Details
            </h2>
            <p>Created By:</p>
            <p>Wallet Address:</p>
            <p>Created At:</p>
            <p>Start Time:</p>
            <p>End Time: </p>
          </div>
          <div className="h-full w-full p-2 md:p-10 lg:p-15 flex flex-col items-start justify-center bg-gray-800">
            {submitted && (
              <>
                <h2 className="my-5 text-3xl font-bold tracking-tight text-gray-300">
                  Campaign <span className="text-cyan-200">Standings</span>
                </h2>
                <h3
                  className="my-5 text-2xl font-bold tracking-tight text-gray-300"
                  id="campaign-radio-group"
                >
                  Topic Here
                </h3>
                {[1, 2, 3, 4].map((i) => (
                  <ProgressBarClient
                    label={`Option ${i}`}
                    value={25 * i}
                    maxValue={100}
                  />
                ))}
              </>
            )}

            {!submitted && (
              <Formik
                initialValues={{
                  picked: "",
                }}
                onSubmit={async (values) => {
                  await new Promise((r) => setTimeout(r, 500));
                  setSubmitted(true);
                  console.log("Picked", values);
                }}
                validate={(values) => {
                  if(values.picked === "")
                  return {picked: "*Please Select one option"}
                }}
              >
                {({ isSubmitting }) => (
                  <Form className="min-w-full">
                    <h3
                      className="my-5 text-2xl font-bold tracking-tight"
                      id="campaign-radio-group"
                    >
                      Topic Here
                    </h3>
                    <div
                      role="group"
                      aria-labelledby="campaign-radio-group"
                      className="block my-6"
                    >
                      {[1, 2, 3, 4].map((i) => (
                        <StyledRadioOptionClient
                          name="picked"
                          value={i.toString()}
                          label={`Option ${i}`}
                        />
                      ))}
                    </div>

                    <StyledButtonClient type="submit" disabled={isSubmitting}>
                      Submit
                    </StyledButtonClient>
                    <ErrorMessage name="picked" component="div" className="mt-4"/>
                  </Form>
                )}
              </Formik>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default VoteInCampaignPage;
