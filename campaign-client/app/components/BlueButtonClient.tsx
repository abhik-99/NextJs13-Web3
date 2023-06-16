"use client";
import React, { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const BlueButtonClient = ({ children, onClick }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="bg-blue-500 p-2 border-b-4 border-blue-700 rounded-full hover:bg-blue-800"
    >
      {children}
    </button>
  );
};

export default BlueButtonClient;
