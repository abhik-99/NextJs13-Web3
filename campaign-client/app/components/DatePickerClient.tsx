import { ErrorMessage } from "formik";
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type DatePickerClientProps = {
  name: string;
  label: string;
  selected: any;
  onChange: (date: any) => void;
};

const DatePickerClient = ({
  name,
  label,
  selected,
  onChange,
}: DatePickerClientProps) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex items-center justify-between">
        <p>{label}</p>
        <DatePicker
          selected={selected}
          className="bg-black border border-gray-600 rounded-md text-center"
          name={name}
          onChange={onChange}
        />
      </div>

      <ErrorMessage
        className="text-sm text-red-400"
        name={name}
        component="div"
      />
    </div>
  );
};

export default DatePickerClient;
