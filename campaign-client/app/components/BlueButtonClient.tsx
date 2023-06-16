"use client";
import React, { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

const BlueButtonClient = ({
  type = "submit",
  disabled = false,
  children,
  onClick,
}: ButtonProps) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className="bg-blue-500 p-2 border-b-4 border-blue-700 rounded-full hover:bg-blue-800"
    >
      {children}
    </button>
  );
};

export default BlueButtonClient;
