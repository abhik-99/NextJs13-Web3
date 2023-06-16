import { Field, FieldAttributes } from "formik";
import React from "react";

const StyledInputClient = ({
  name,
  type,
  placeholder
}: FieldAttributes<any>) => {
  return (
    <div className="space-x-2 rounded-md bg-gray-50 p-1 m-1">
      <Field
        type={type}
        name={name}
        placeholder={placeholder}
        className="text-gray-900 focus:outline-none outline-none bg-transparent border-none"
      />
    </div>
  );
};

export default StyledInputClient;
