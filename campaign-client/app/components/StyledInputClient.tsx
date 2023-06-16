import React from "react";

type StyledInputProps = {
  type?: string;
  placeholder: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>
};

const StyledInputClient = ({
  type = "text",
  placeholder,
  onChange
}: StyledInputProps) => {
  return (
    <div className="space-x-2 rounded-md bg-gray-50 p-1 m-1">
      <input
        type={type}
        placeholder={placeholder}
        className="text-gray-900 focus:outline-none outline-none bg-transparent border-none"
        onChange={onChange}
      />
    </div>
  );
};

export default StyledInputClient;
