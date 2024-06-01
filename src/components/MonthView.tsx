import React from "react";
import { startOfMonth, endOfMonth, eachDayOfInterval } from "date-fns";
import CustomTable from "./CustomTable";

interface MonthViewProps {
  date: Date;
}

const MonthView = ({ date }: MonthViewProps) => {
  const startOfMonthDate = startOfMonth(date);
  const endOfMonthDate = endOfMonth(date);
  const daysOfMonth = eachDayOfInterval({
    start: startOfMonthDate,
    end: endOfMonthDate,
  });

  return (
    <div>
      <CustomTable days={[...daysOfMonth]} />
    </div>
  );
};

export default MonthView;
