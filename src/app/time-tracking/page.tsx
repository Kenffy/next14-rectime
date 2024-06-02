import CustomCalendar from "@/components/CustomCalendar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Time Tracking",
  description: "Time Tracking",
};

export default function TimeTracking() {
  return (
    <div className=" flex flex-col gap-4 p-5">
      <CustomCalendar />
    </div>
  );
}
