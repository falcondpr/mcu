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
  selectedDate: Dayjs | null;
  onSelectDate: (date: Dayjs) => void;
}

const Calendar = ({ selectedDate, onSelectDate }: CalendarProps) => {
  const [currentDate, setCurrentDate] = useState<Dayjs>(dayjs());
  const [viewMode, setViewMode] = useState<ViewMode>("calendar");
  const [days, setDays] = useState<Day[]>([]);
  const [isPreviousMonth, setIsPreviousMonth] = useState<boolean[]>(
    []
  );

  const handleDayClick = (day: number, isPreviousMonth: boolean) => {
    const selectedDate = isPreviousMonth
      ? currentDate.subtract(1, "month").date(day)
      : currentDate.date(day);

    onSelectDate(selectedDate);
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
    const previousMonth = currentDate.subtract(1, "month");
    const daysInPreviousMonth = previousMonth.daysInMonth();

    const updatedDays: number[] = [];
    const isPreviousMonthArray: boolean[] = [];

    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      updatedDays.push(daysInPreviousMonth - i);
      isPreviousMonthArray.push(true); // Marcar como día del mes anterior
    }

    for (let i = 1; i <= daysInMonth; i++) {
      updatedDays.push(i);
      isPreviousMonthArray.push(false); // Marcar como día del mes actual
    }

    setDays(updatedDays);
    setIsPreviousMonth(isPreviousMonthArray); // Guardar información sobre qué días son del mes anterior
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
      bg={{
        _dark: "gray.900",
        _light: "#f7f7f7",
      }}
      rounded="lg"
      border="1px solid"
      borderColor={{
        _dark: "gray.800",
        _light: "gray.200",
      }}
      maxH={viewMode === "year" ? "380px" : "full"}
      overflowY="auto"
      className="hide-scrollbar"
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
          isPreviousMonthArray={isPreviousMonth}
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
