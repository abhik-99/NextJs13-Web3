"use client";
import { ErrorMessage, Field } from "formik";
import React from "react";

type TimePickerClientProps = {
  label?: string;
  name: string;
};

const TimePickerClient = ({
  label = "Select a time",
  name,
}: TimePickerClientProps) => {
  return (
    <div className="flex items-center justify-between">
      <p>{label} </p>
      <div className="inline-flex border rounded-md shadow-lg m-2 p-1 border-gray-600">
        <Field
          as="select"
          name={`${name}Hour`}
          className="px-2 outline-none appearance-none bg-black"
        >
          {[...Array(12).keys()].map((i) => (
            <option value={i.toString()} key={`${name}Hour${i}`}>{i < 10 ? `0${i}` : i}</option>
          ))}
        </Field>
        <span className="px-2">:</span>
        <Field
          as="select"
          name={`${name}Minute`}
          className="px-2 outline-none appearance-none bg-black"
        >
          {[...Array(60).keys()].map((i) => (
            <option value={i.toString()} key={`${name}Minute${i}`}>{i < 10 ? `0${i}` : i}</option>
          ))}
        </Field>
        <Field
          as="select"
          name={`${name}Half`}
          className="px-2 outline-none appearance-none bg-black"
        >
          <option value="AM">AM</option>
          <option value="PM">PM</option>
        </Field>
      </div>
      <ErrorMessage
        className="text-sm text-red-400"
        name={name}
        component="div"
      />
    </div>
  );
};

export default TimePickerClient;
