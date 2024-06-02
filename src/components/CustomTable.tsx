import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import Upsert from "./Upsert";

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
            <TableHead className=" text-center">Start</TableHead>
            <TableHead className=" text-center">End</TableHead>
            <TableHead className=" text-center">Pause</TableHead>
            <TableHead className=" text-center">Soll</TableHead>
            <TableHead className=" text-center">Ist</TableHead>
            <TableHead className=" text-center">Gleitzeit</TableHead>
            <TableHead className=" text-end">Actions</TableHead>
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
              <TableCell className=" text-center">{"00:00:00"}</TableCell>
              <TableCell className=" text-center">{"00:00:00"}</TableCell>
              <TableCell className=" text-center">{"--:--:--"}</TableCell>
              <TableCell className=" text-center">{"--:--:--"}</TableCell>
              <TableCell className=" text-center">{"--:--:--"}</TableCell>
              <TableCell className=" text-center">{"--:--:--"}</TableCell>
              <TableCell className=" flex items-center justify-end gap-3">
                <Upsert date={day}/>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
