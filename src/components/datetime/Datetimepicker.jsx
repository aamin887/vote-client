import "./datetimepicker.css";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { format } from "date-fns";

import "react-datepicker/dist/react-datepicker.css";

const DateTimePicker = ({ label, setDate, name, value }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [startDate, setStartDate] = useState(null);

  // Handle date change
  const handleChange = (date) => {
    setSelectedDate(date);

    console.log(date);

    const formatedDate = format(date, "MM/dd/yyyy H:mm");

    setDate((prev) => {
      if (prev.startDate) {
        setStartDate(prev.startDate);
      }
      return { ...prev, [name]: formatedDate };
    });
  };

  useEffect(() => {}, []);

  return (
    <div className="date-time-picker">
      <label htmlFor="date-time-input" className="picker-label">
        {label}
      </label>
      <DatePicker
        selected={selectedDate}
        onChange={handleChange}
        showTimeSelect
        dateFormat="MM d, yyyy h:mm aa"
        timeFormat="HH:mm"
        placeholderText="Select date and time"
        className={`${
          selectedDate === null ? "custom-input null" : "custom-input"
        }`}
        timeIntervals={15}
        minDate={startDate === null ? new Date() : startDate}
        isClearable
      />
    </div>
  );
};

export default DateTimePicker;
