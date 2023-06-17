import React from "react";

type ProgressBarClientProps = {
  label?: string;
  value: number;
  maxValue: number;
};

const ProgressBarClient = ({
  label,
  value,
  maxValue = 100,
}: ProgressBarClientProps) => {
  return (
    <div className="w-full bg-black rounded-full my-4 border border-gray-500">
      <div
        className="bg-gray-600 text-sm font-medium text-blue-100 text-center py-2 leading-none rounded-full"
        style={{ width: `${(value / maxValue) * 100}%` }}
      >{label?.slice(0, 50)}</div>
    </div>
  );
};

export default ProgressBarClient;
