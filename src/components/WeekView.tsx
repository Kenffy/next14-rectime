import React from "react";
import { startOfWeek, endOfWeek, eachDayOfInterval } from "date-fns";

import CustomTable from "./CustomTable";

interface WeekViewProps {
  date: Date;
}

const WeekView = ({ date }: WeekViewProps) => {
  const weekStart = startOfWeek(date, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(date, { weekStartsOn: 1 });
  let currentWeek: Date[] = [];
  currentWeek = eachDayOfInterval({ start: weekStart, end: weekEnd });

  return (
    <div>
      <CustomTable days={[...currentWeek]} />
    </div>
  );
};

export default WeekView;
