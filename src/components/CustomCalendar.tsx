"use client";
import React, { useState } from "react";
import { addDays, addWeeks, addMonths, format, startOfWeek } from "date-fns";
import DayView from "./DayView";
import WeekView from "./WeekView";
import MonthView from "./MonthView";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";

function CustomCalendar() {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [view, setView] = useState<"day" | "week" | "month">("week");

  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });

  const handleViewChange = (newView: "day" | "week" | "month") => {
    setView(newView);
  };

  const handleCurrentDate = (date: Date) => {
    setCurrentDate(date);
  };

  const handlePrev = () => {
    switch (view) {
      case "day":
        setCurrentDate(addDays(currentDate, -1));
        break;
      case "week":
        setCurrentDate(addWeeks(currentDate, -1));
        break;
      case "month":
        setCurrentDate(addMonths(currentDate, -1));
        break;
      default:
        break;
    }
  };

  const handleNext = () => {
    switch (view) {
      case "day":
        setCurrentDate(addDays(currentDate, 1));
        break;
      case "week":
        setCurrentDate(addWeeks(currentDate, 1));
        break;
      case "month":
        setCurrentDate(addMonths(currentDate, 1));
        break;
      default:
        break;
    }
  };

  return (
    <div className="custom-calendar w-full">
      <Tabs defaultValue="week" className=" w-ull">
        <div className=" flex items-center justify-between">
          <div className=" flex items-center gap-3">
            <Button variant="outline" onClick={handlePrev}>
              Prev
            </Button>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[180px] justify-start text-left font-normal",
                    !currentDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {currentDate ? (
                    <>
                      {view === "month" && (
                        <Label>{format(currentDate, "MMM yyyy")}</Label>
                      )}
                      {view === "week" && (
                        <Label>{format(weekStart, "d MMM, yyyy")}</Label>
                      )}
                      {view === "day" && (
                        <Label>{format(currentDate, "PPP")}</Label>
                      )}
                    </>
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={currentDate}
                  onDayClick={handleCurrentDate}
                  //onSelect={(date) => handleCurrentDate(date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <Button variant="outline" onClick={handleNext}>
              Next
            </Button>
          </div>

          <TabsList className="grid w-fit grid-cols-3">
            <TabsTrigger
              value="month"
              onClick={() => handleViewChange("month")}
            >
              Month
            </TabsTrigger>
            <TabsTrigger value="week" onClick={() => handleViewChange("week")}>
              Week
            </TabsTrigger>
            <TabsTrigger value="day" onClick={() => handleViewChange("day")}>
              Day
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="day">
          <Card>
            <CardHeader>
              <CardTitle>Daily View</CardTitle>
              <CardDescription></CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <DayView date={currentDate} />
            </CardContent>
            <CardFooter></CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="week">
          <Card>
            <CardHeader>
              <CardTitle>Weekly View</CardTitle>
              <CardDescription></CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <WeekView date={currentDate} />
            </CardContent>
            <CardFooter></CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="month">
          <Card>
            <CardHeader>
              <CardTitle>Monthly View</CardTitle>
              <CardDescription></CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <MonthView date={currentDate} />
            </CardContent>
            <CardFooter></CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default CustomCalendar;
