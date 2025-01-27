import { useState, useEffect } from "react";

const useDateDiff = function (endDate) {
  const [timeDiff, setTimeDiff] = useState("");

  useEffect(() => {
    const updateTimeDiff = () => {
      const dt1 = new Date(); // Current date and time
      const dt2 = new Date(endDate); // End date

      const totalSeconds = Math.floor((dt2 - dt1) / 1000); // Total difference in seconds

      if (totalSeconds <= 0) {
        setTimeDiff("Time expired");
        return;
      }

      const days = Math.floor(totalSeconds / (24 * 60 * 60)); // Calculate days
      const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60)); // Remaining hours
      const minutes = Math.floor((totalSeconds % (60 * 60)) / 60); // Remaining minutes
      const seconds = totalSeconds % 60; // Remaining seconds

      const parts = [];
      if (days > 0) parts.push(`${days} day${days > 1 ? "s" : "0"}`);
      if (hours > 0) parts.push(`${hours} hour${hours > 1 ? "s" : "0"}`);
      if (minutes > 0)
        parts.push(`${minutes} minute${minutes > 1 ? "s" : "0"}`);
      if (seconds >= 0)
        parts.push(`${seconds} second${seconds > 1 ? "s" : "0"}`);

      setTimeDiff(parts.join(", "));
    };

    updateTimeDiff(); // Update immediately on mount
    const interval = setInterval(updateTimeDiff, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [endDate]);

  return timeDiff;
};

export default useDateDiff;
