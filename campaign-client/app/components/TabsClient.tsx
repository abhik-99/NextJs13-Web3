"use client";
import React from "react";
import cx from "classnames";
type TabsPanelClientProps = {
  children: React.ReactNode;
};
type TabClientProps = {
  value: number;
  index: number;
  name: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>
};

type TabBodyClientProps = {
  value: number;
  index: number;
  children: React.ReactNode;
  className?: string;
};

export const TabsPanelClient = ({ children }: TabsPanelClientProps) => {
  return (
    <div className="mb-4 text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
      <ul className="flex flex-wrap -mb-px">{children}</ul>
    </div>
  );
};

export const TabClient = ({ value, index, name, onClick }: TabClientProps) => {
  return (
    <li className="mr-2">
      <button
        onClick={onClick}
        className={cx(
          "inline-block p-4 border-b-2 rounded-t-lg",
          value === index
            ? "text-blue-600 border-blue-600 active dark:text-blue-500 dark:border-blue-500"
            : "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
        )}
      >
        {name}
      </button>
    </li>
  );
};

export const TabBodyClient = ({
  value,
  index,
  children,
  className,
}: TabBodyClientProps) => {
  if (value === index) return <div className={className}>{children}</div>;
};
