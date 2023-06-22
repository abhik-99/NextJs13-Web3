"use client";
import React from "react";
import StyledButtonClient from "@/app/components/StyledButtonClient";
import StyledInputClient from "@/app/components/StyledInputClient";
import DatePickerClient from "@/app/components/DatePickerClient";
import { Form, Formik, FormikValues } from "formik";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import { writeContract } from "@wagmi/core";

import contractAbi from "@/app/blockchain/contract_abi.json";
import { polygonMumbai } from "viem/chains";
import { useAccount, useConnect } from "wagmi";
import { waitForTransaction } from "@wagmi/core";
import { InjectedConnector } from "wagmi/connectors/injected";

const CreateNewCampaignPage = () => {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector({
      chains: [polygonMumbai],
    }),
  });
  console.log("Address and connection?", address, isConnected);

  const handleCampaignCreation = async (
    values: FormikValues,
    { setSubmitting }: any
  ) => {
    try {
      if (!isConnected) {
        connect();
      }
      const {
        data: { signedMessage, eat, nonce },
      } = await axios.get("/api/sig-token");

      console.log("Values to use for campaign creation", [
        values.topic,
        [values.option1, values.option2, values.option3, values.option4],
        BigInt(Math.trunc(values.startDate.valueOf() / 1000)),
        BigInt(Math.trunc(values.endDate.valueOf() / 1000)),
        { signature: signedMessage, eat: BigInt(eat), nonce: nonce },
      ]);

      const { hash } = await writeContract({
        address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
        abi: contractAbi,
        functionName: "createCampaign",
        args: [
          values.topic,
          [values.option1, values.option2, values.option3, values.option4],
          BigInt(Math.trunc(values.startDate.valueOf() / 1000)),
          BigInt(Math.trunc(values.endDate.valueOf() / 1000)),
          { signature: signedMessage, eat: BigInt(eat), nonce: nonce },
        ],
        chainId: polygonMumbai.id,
      });
      console.log("Hash of the transaction (watching)", hash);
      const data = await waitForTransaction({
        hash,
      });

      toast.loading("Campaign Creation Transaction Submitted");
      console.log("Transaction data", data);

      axios.post("/api/campaign/create-campaign", {
        hash,
        ...values,
      });
      
    toast.loading("Please verify campaign after transaction succeeds");
    } catch (error) {
      console.log("Error occured", error);
      toast.error("Something went wrong!");
    }
    setSubmitting(false);
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="my-10 text-5xl font-bold tracking-tight text-gray-400">
        <span className="text-green-500">New</span> Campaign
      </h1>
      <main className="mb-6 w-full max-w-sm py-4 rounded-lg shadow sm:p-6 md:pt-8 bg-gray-900 border border-gray-600">
        <Formik
          initialValues={{
            topic: "",
            option1: "",
            option2: "",
            option3: "",
            option4: "",
            startDate: new Date(),
            endDate: new Date(),
          }}
          onSubmit={handleCampaignCreation}
          validate={(values) => {
            const errors: any = {};

            if (!values.topic) {
              errors.topic = "*Required";
            }
            if (!values.option1) {
              errors.option1 = "*Required";
            }
            if (!values.option2) {
              errors.option2 = "*Required";
            }
            if (!values.option3) {
              errors.option3 = "*Required";
            }
            if (!values.option4) {
              errors.option4 = "*Required";
            }
            if (values.startDate.valueOf() < Date.now().valueOf()) {
              errors.startDate = "Campaign must start in the future";
            }
            if (
              values.startDate.toUTCString() === values.endDate.toUTCString()
            ) {
              errors.endDate = "End Date cannot be same as Start Date";
            }
            if (
              values.endDate.valueOf() <
              values.startDate.valueOf() + 3 * 24 * 60 * 60 * 1000
            ) {
              errors.endDate = "Campaign should last more than 3 days";
            }
            return errors;
          }}
        >
          {({ isSubmitting, values, setFieldValue }) => (
            <Form>
              <div className="my-2">
                <h2 className="text-lg font-bold tracking-tight text-gray-200">
                  Enter Your Question / Topic:
                </h2>
                <StyledInputClient
                  type="text"
                  name="topic"
                  placeholder="What's the topic?"
                />
              </div>

              <div className="my-2">
                <StyledInputClient
                  type="text"
                  name="option1"
                  placeholder="First Option..."
                  label="Option 1:"
                />
              </div>

              <div className="my-2">
                <StyledInputClient
                  type="text"
                  name="option2"
                  placeholder="Second Option..."
                  label="Option 2:"
                />
              </div>

              <div className="my-2">
                <StyledInputClient
                  type="text"
                  name="option3"
                  placeholder="Third Option..."
                  label="Option 3:"
                />
              </div>

              <div className="mb-4">
                <StyledInputClient
                  type="text"
                  name="option4"
                  placeholder="And last but not the least..."
                  label="Option 4:"
                />
              </div>
              <h2 className="text-lg font-bold tracking-tight text-gray-200 mt-6">
                Timings:
              </h2>
              <span className="text-xs  text-gray-300">
                pzzt... Revolutions always begin and end at mid-night
              </span>
              <div className="my-2 py-2 border-t-2 border-gray-600">
                <DatePickerClient
                  name="startDate"
                  label="Start Date: "
                  selected={values.startDate}
                  onChange={(date: any) => setFieldValue("startDate", date)}
                />
              </div>
              <hr className="border-gray-500" />
              <div className="mt-1 mb-5 py-2 border-b-2 border-gray-600">
                <DatePickerClient
                  name="endDate"
                  label="End Date: "
                  selected={values.endDate}
                  onChange={(date: any) => setFieldValue("endDate", date)}
                />
              </div>

              <StyledButtonClient
                type="submit"
                disabled={isSubmitting}
                fullWidth
                color="green"
              >
                Create Campaign
              </StyledButtonClient>
            </Form>
          )}
        </Formik>
        <div className="my-2" />
        <Link href="/dashboard">
          <StyledButtonClient fullWidth>
            {`<`} Back to Dashboard
          </StyledButtonClient>
        </Link>
      </main>
    </div>
  );
};

export default CreateNewCampaignPage;
