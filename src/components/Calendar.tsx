import { useState, useEffect } from "react";
import dayjs, { Dayjs } from "dayjs";
import { Box } from "@chakra-ui/react";

import Header from "./Header";
import MonthView from "./MonthView";
import YearView from "./YearView";
import DaysView from "./DaysView";

export type ViewMode = "calendar" | "month" | "year";
export type Day = number | null;

interface CalendarProps {
  selectedDate: string | null;
  onSelectDate: (date: string) => void;
}

const Calendar = ({ selectedDate, onSelectDate }: CalendarProps) => {
  const [currentDate, setCurrentDate] = useState<Dayjs>(dayjs());
  const [viewMode, setViewMode] = useState<ViewMode>("calendar");
  const [days, setDays] = useState<Day[]>([]);

  const handleDayClick = (day: Day) => {
    if (day !== null) {
      const selectedDate = currentDate.date(day).format("YYYY-MM-DD");
      onSelectDate(selectedDate);
    }
  };

  const handlePrevMonth = () =>
    setCurrentDate(currentDate.subtract(1, "month"));

  const handleNextMonth = () =>
    setCurrentDate(currentDate.add(1, "month"));

  const handleMonthSelect = (month: number) => {
    setCurrentDate(currentDate.month(month));
    setViewMode("calendar");
  };

  const handleYearSelect = (year: number) => {
    setCurrentDate(currentDate.year(year));
    setViewMode("calendar");
  };

  useEffect(() => {
    const daysInMonth = currentDate.daysInMonth();
    const firstDayOfMonth = currentDate.startOf("month").day();

    const updatedDays: Day[] = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      updatedDays.push(null);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      updatedDays.push(i);
    }

    setDays(updatedDays);
  }, [currentDate]);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const years = [];
  for (let year = 2027; year >= 1970; year--) {
    years.push(year);
  }

  return (
    <Box
      w="full"
      maxW="sm"
      mx="auto"
      bg="white"
      rounded="lg"
      shadow="md"
      maxH="361px"
      overflowY="auto"
    >
      <Header
        viewMode={viewMode}
        currentDate={currentDate}
        setViewMode={setViewMode}
        handlePrevMonth={handlePrevMonth}
        handleNextMonth={handleNextMonth}
      />

      {viewMode === "month" && (
        <MonthView
          currentDate={currentDate}
          handleMonthSelect={handleMonthSelect}
          months={months}
        />
      )}

      {viewMode === "year" && (
        <YearView
          currentDate={currentDate}
          years={years}
          handleYearSelect={handleYearSelect}
        />
      )}

      {viewMode === "calendar" && (
        <DaysView
          selectedDate={selectedDate}
          currentDate={currentDate}
          days={days}
          handleDayClick={handleDayClick}
        />
      )}
    </Box>
  );
};

export default Calendar;
