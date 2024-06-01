import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

interface TableProps {
  days: Date[];
}

export default function CustomTable({ days }: TableProps) {
  const isWeekendDay = (day: Date) => {
    const isWeekend = [0, 6].includes(day.getDay());
    return isWeekend;
  };
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="">Day</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Start</TableHead>
            <TableHead>End</TableHead>
            <TableHead>Pause</TableHead>
            <TableHead>Soll</TableHead>
            <TableHead>Ist</TableHead>
            <TableHead>Gleitzeit</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className=" overflow-y-auto">
          {days.map((day: any, index: any) => (
            <TableRow
              key={index}
              className={`${isWeekendDay(day) ? " bg-secondary" : ""} `}
            >
              <TableCell className="">{format(day, "EEEEEE")}</TableCell>
              <TableCell className="">{format(day, "dd.MM.yyyy")}</TableCell>
              <TableCell className="">{"00:00:00"}</TableCell>
              <TableCell className="">{"00:00:00"}</TableCell>
              <TableCell className="">{"--:--:--"}</TableCell>
              <TableCell className="">{"--:--:--"}</TableCell>
              <TableCell className="">{"--:--:--"}</TableCell>
              <TableCell className="">{"--:--:--"}</TableCell>
              <TableCell className=" flex items-center gap-3">
                <span>Edit</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
