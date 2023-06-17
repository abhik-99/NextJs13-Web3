"use client";
import { Field } from "formik";
import React from "react";
type StyledRadioOptionClientProps = {
  name: string;
  value: string | number;
  label: string;
}

const StyledRadioOptionClient = ({name, value, label}: StyledRadioOptionClientProps) => {
  return (
    <div className="min-w-full border border-gray-400 rounded-lg p-2 my-2 hover:bg-gray-700">
      <label>
        <Field type="radio" name={name} value={value} className="mr-2" />
        {label}
      </label>
    </div>
  );
};

export default StyledRadioOptionClient;
