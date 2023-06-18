"use client";
import React from "react";
import StyledButtonClient from "@/app/components/StyledButtonClient";
import StyledInputClient from "@/app/components/StyledInputClient";
import DatePickerClient from "@/app/components/DatePickerClient";
import { Form, Formik, FormikValues } from "formik";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";

const CreateNewCampaignPage = () => {
  const handleCampaignCreation = (
    values: FormikValues,
    { setSubmitting }: any
  ) => {
    console.log("Values to use for campaign creation", {
      ...values,
      startDate: values.startDate.valueOf().toString(),
      endDate: values.startDate.valueOf().toString(),
    });
    axios.post("/api/create-campaign", values)
    .catch(() => toast.error("Something went wrong!"));
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
              values.startDate.valueOf() + 2 * 24 * 60 * 60 * 1000
            ) {
              errors.endDate = "Campaign should take 2 days min";
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
