import { useState, useEffect } from "react";
import dayjs, { Dayjs } from "dayjs";
import { Box, Button, Flex, Grid } from "@chakra-ui/react";

type ViewMode = "calendar" | "month" | "year";
type Day = number | null;

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

  const years = Array.from(
    { length: 12 },
    (_, i) => currentDate.year() - 5 + i
  );

  return (
    <Box
      w="full"
      maxW="sm"
      mx="auto"
      bg="white"
      rounded="lg"
      shadow="md"
      // p={2}
      // className="w-full max-w-sm mx-auto bg-white rounded-lg shadow-md p-4 dark:bg-gray-800"
    >
      <Flex
        justifyContent="space-between"
        alignItems="center"
        mb={4}
        // className="flex justify-between items-center mb-4"
      >
        {viewMode === "calendar" && (
          <>
            <Button
              color="gray.600"
              _hover={{
                color: "gray.900",
              }}
              onClick={handlePrevMonth}
              // className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            >
              &lt;
            </Button>
            <Button
              color="gray.800"
              _hover={{
                color: "gray.900",
              }}
              onClick={() => setViewMode("month")}
              fontSize="lg"
              fontWeight="bold"
              // className="text-lg font-bold text-gray-800 dark:text-white"
            >
              {currentDate.format("MMMM")}
            </Button>
            <Button
              color="gray.800"
              _hover={{
                color: "gray.900",
              }}
              fontSize="lg"
              fontWeight="bold"
              onClick={() => setViewMode("year")}
              // className="text-lg font-bold text-gray-800 dark:text-white"
            >
              {currentDate.format("YYYY")}
            </Button>
            <Button
              color="gray.800"
              _hover={{
                color: "gray.900",
              }}
              onClick={handleNextMonth}
              // className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            >
              &gt;
            </Button>
          </>
        )}

        {viewMode !== "calendar" && (
          <button
            onClick={() => setViewMode("calendar")}
            className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
          >
            &lt; Back
          </button>
        )}
      </Flex>

      {viewMode === "month" && (
        <div className="grid grid-cols-3 gap-2">
          {months.map((month, index) => (
            <button
              key={month}
              onClick={() => handleMonthSelect(index)}
              className={`text-lg font-bold text-gray-800 dark:text-white ${
                currentDate.month() === index
                  ? "bg-gray-300 dark:bg-gray-600"
                  : ""
              }`}
            >
              {month}
            </button>
          ))}
        </div>
      )}

      {viewMode === "year" && (
        <div className="grid grid-cols-3 gap-2">
          {years.map((year) => (
            <button
              key={year}
              onClick={() => handleYearSelect(year)}
              className={`p-2 rounded-md text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 ${
                currentDate.year() === year
                  ? "bg-gray-300 dark:bg-gray-600"
                  : ""
              }`}
            >
              {year}
            </button>
          ))}
        </div>
      )}

      {viewMode === "calendar" && (
        <Box
          mt={4}
          // className="mt-4"
        >
          <Grid
            gridTemplateColumns="repeat(7,1fr)"
            textAlign="center"
            fontSize="sm"
            color="gray.500"
            // className="grid grid-cols-7 text-center text-sm text-gray-500 dark:text-gray-400"
          >
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
              (day, index) => (
                <div key={index}>{day}</div>
              )
            )}
          </Grid>

          <Grid
            gridTemplateColumns="repeat(7,1fr)"
            gap={4}
            mt={4}
            // className="grid grid-cols-7 gap-2 mt-2"
          >
            {days.map((day, index) => (
              <Button
                key={index}
                type="button"
                height="40px"
                display="flex"
                alignItems="center"
                justifyContent="center"
                borderRadius="full"
                color="gray.600"
                cursor="pointer"
                bg={
                  day !== null && day === currentDate.date()
                    ? "blue.500"
                    : day !== null &&
                        selectedDate ===
                          currentDate.date(day).format("YYYY-MM-DD")
                      ? "green.500"
                      : "transparent"
                }
                _hover={{
                  bg:
                    day !== null && day === currentDate.date()
                      ? "blue.600"
                      : day !== null &&
                          selectedDate ===
                            currentDate.date(day).format("YYYY-MM-DD")
                        ? "green.500"
                        : "gray.200",
                  color: "white",
                  _dark: {
                    bg:
                      day !== null &&
                      selectedDate ===
                        currentDate.date(day).format("YYYY-MM-DD")
                        ? "green.500"
                        : "gray.700",
                  },
                }}
                onClick={() => day && handleDayClick(day)}
              >
                {day !== null && (
                  <Box
                    as="span"
                    textAlign="center"
                    width="32px"
                    height="32px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    borderRadius="full"
                  >
                    {day}
                  </Box>
                )}
              </Button>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default Calendar;
