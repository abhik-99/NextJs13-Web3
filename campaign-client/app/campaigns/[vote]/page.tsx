"use client";
import BlueButtonClient from "@/app/components/BlueButtonClient";
import StyledRadioOptionClient from "@/app/components/StyledRadioClient";
import { Field, Form, Formik } from "formik";
import React from "react";

const VoteInCampaignPage = ({ params }: { params: { vote: string } }) => {
  console.log("Router Params", params);
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
          <div className="h-full w-full h-full w-full p-2 md:p-10 lg:p-15 flex flex-col items-start justify-center bg-gray-800">
            <Formik
              initialValues={{
                picked: "",
              }}
              onSubmit={async (values) => {
                await new Promise((r) => setTimeout(r, 500));
                alert(JSON.stringify(values, null, 2));
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

                  <BlueButtonClient type="submit" disabled={isSubmitting}>
                    Submit
                  </BlueButtonClient>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </main>
      <div className="m-2 min-w-full">
        <h2 className="my-5 text-3xl font-bold tracking-tight text-gray-400">
          Campaign <span className="text-cyan-200">Standings</span>
        </h2>
      </div>
    </div>
  );
};

export default VoteInCampaignPage;
