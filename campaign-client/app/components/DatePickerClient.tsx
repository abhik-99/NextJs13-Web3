import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type DatePickerClientProps = {
  label: string;
  selected: any;
  onChange: (date: any) => void;
};

const DatePickerClient = ({
  label,
  selected,
  onChange,
}: DatePickerClientProps) => {
  return (
    <div className="flex items-center justify-between">
      <p>{label}</p>
      <DatePicker
        selected={selected}
        className="bg-black border border-gray-600 rounded-md"
        name="startDate"
        onChange={onChange}
      />
    </div>
  );
};

export default DatePickerClient;
