"use client";
import React from "react";
import StyledButtonClient from "@/app/components/StyledButtonClient";
import StyledInputClient from "@/app/components/StyledInputClient";
import TimePickerClient from "@/app/components/TimePickerClient";
import DatePickerClient from "@/app/components/DatePickerClient";
import { Form, Formik } from "formik";
import Link from "next/link";

const CreateNewCampaignPage = () => {
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
            startTimeHour: "03",
            startTimeMinute: "00",
            startTimeHalf: "AM",
            endTimeHour: "02",
            endTimeMinute: "00",
            endTimeHalf: "AM",
            startDate: new Date(),
            endDate: new Date(),
          }}
          onSubmit={(values, formikHelpers) => {
            console.log("Campaign to be created with values", values);
          }}
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
            if (
              !values.startTimeHour ||
              !values.startTimeMinute ||
              !values.startTimeHalf
            ) {
              errors.startTime = "*Required";
              console.log("this");
            }
            if (
              !values.endTimeHour ||
              !values.endTimeMinute ||
              !values.endTimeHalf
            ) {
              errors.endTime = "*Required";
              console.log("this2");
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
              <div className="my-2 py-2 border-t-2 border-gray-600">
                <DatePickerClient
                  label="Start Date: "
                  selected={values.startDate}
                  onChange={(date: any) => setFieldValue("startDate", date)}
                />
                <TimePickerClient name="startTime" label="Start Time: " />
              </div>
              <hr className="border-gray-500" />
              <div className="mt-1 mb-5 py-2 border-b-2 border-gray-600">
                <DatePickerClient
                  label="End Date: "
                  selected={values.endDate}
                  onChange={(date: any) => setFieldValue("endDate", date)}
                />
                <TimePickerClient name="endTime" label="End Time: " />
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
