import { ErrorMessage, Field, FieldAttributes } from "formik";
import React from "react";

type StyledInputClientProps = FieldAttributes<any> & {
  label?: string;
};

const StyledInputClient = ({
  name,
  type,
  placeholder,
  label,
}: StyledInputClientProps) => {
  return (
    <>
      {label ? (
        <label>
          {label}
          <div className="space-x-2 rounded-md bg-black p-1 border border-gray-600">
            <Field
              type={type}
              name={name}
              placeholder={placeholder}
              className="text-gray-300 focus:outline-none outline-none bg-transparent border-none"
            />
          </div>
          <ErrorMessage className="text-sm text-red-400" name={name} component="div" />
        </label>
      ) : (
        <>
          <div className="space-x-2 rounded-md bg-black p-1 border border-gray-600">
            <Field
              type={type}
              name={name}
              placeholder={placeholder}
              className="text-gray-300 focus:outline-none outline-none bg-transparent border-none"
            />
          </div>
          <ErrorMessage className="text-sm text-red-400" name={name} component="div" />
        </>
      )}
    </>
  );
};

export default StyledInputClient;
