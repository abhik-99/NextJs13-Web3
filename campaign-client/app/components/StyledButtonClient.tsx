"use client";
import React, { ButtonHTMLAttributes, ReactNode } from "react";
import cx from "classnames";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  color?: "blue" | "green" | "yellow" | "red";
  fullWidth?: boolean;
};

const StyledButtonClient = ({
  type = "submit",
  disabled = false,
  children,
  onClick,
  color = "blue",
  fullWidth = false,
  ...otherProps
}: ButtonProps) => {
  const colorClass =
    color === "blue"
      ? "bg-blue-500  border-blue-700  hover:bg-blue-800"
      : color === "green"
      ? "bg-green-500  border-green-700  hover:bg-green-800"
      : color === "red"
      ? "bg-red-500  border-red-700  hover:bg-red-800"
      : "bg-yellow-500  border-yellow-700  hover:bg-yellow-800";
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={cx(
        "py-2 px-4 border-b-4 rounded-full",
        fullWidth && "w-full",
        colorClass,
        disabled && "opacity-60"
      )}
      {...otherProps}
    >
      {children}
    </button>
  );
};

export default StyledButtonClient;
