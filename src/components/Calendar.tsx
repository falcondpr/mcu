import { useState, useEffect } from "react";
import dayjs, { Dayjs } from "dayjs";
import { Box, Button, Flex, Grid } from "@chakra-ui/react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

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
    >
      <Flex py={3} justifyContent="space-between" alignItems="center">
        {viewMode === "calendar" && (
          <>
            <Button
              color="gray.600"
              _hover={{
                color: "gray.900",
              }}
              onClick={handlePrevMonth}
              bgColor="transparent"
            >
              <FaAngleLeft />
            </Button>
            <Flex gapX={2}>
              <Button
                color="gray.800"
                _hover={{
                  color: "gray.900",
                }}
                onClick={() => setViewMode("month")}
                fontSize="lg"
                fontWeight="bold"
                bgColor="transparent"
                px="0"
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
                bgColor="transparent"
                px="0"
              >
                {currentDate.format("YYYY")}
              </Button>
            </Flex>
            <Button
              color="gray.800"
              _hover={{
                color: "gray.900",
              }}
              onClick={handleNextMonth}
              bgColor="transparent"
            >
              <FaAngleRight />
            </Button>
          </>
        )}

        {viewMode !== "calendar" && (
          <Button
            display="flex"
            bg="transparent"
            alignItems="center"
            onClick={() => setViewMode("calendar")}
            color="gray.800"
            ml={3}
          >
            <FaAngleLeft color="inherit" />
            <Box
              color="inherit"
              display="flex"
              alignItems="center"
              fontWeight="semibold"
              as="span"
              fontSize="lg"
              lineHeight={1.5}
              height="40px"
            >
              Volver
            </Box>
          </Button>
        )}
      </Flex>

      {viewMode === "month" && (
        <Flex flexWrap="wrap" gap={2} px={3} pb={3}>
          {months.map((month, index) => (
            <Button
              key={month}
              onClick={() => handleMonthSelect(index)}
              bg={
                index === currentDate.month()
                  ? "gray.200"
                  : "transparent"
              }
              color="gray.700"
              fontSize="md"
            >
              {month}
            </Button>
          ))}
        </Flex>
      )}

      {viewMode === "year" && (
        <Flex flexWrap="wrap" gap={2} px={3} pb={3}>
          {years.map((year) => (
            <Button
              key={year}
              bg={
                year === currentDate.year()
                  ? "gray.200"
                  : "transparent"
              }
              color="gray.700"
              fontSize="md"
              onClick={() => handleYearSelect(year)}
            >
              {year}
            </Button>
          ))}
        </Flex>
      )}

      {viewMode === "calendar" && (
        <Box>
          <Grid
            gridTemplateColumns="repeat(7,1fr)"
            textAlign="center"
            fontSize="sm"
            color="gray.500"
            px={2}
          >
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
              (day, index) => (
                <div key={index}>{day}</div>
              )
            )}
          </Grid>

          <Grid
            mx={2}
            gridTemplateColumns="repeat(7,1fr)"
            rowGap={3}
            justifyItems="center"
            mt={4}
            pb={3}
          >
            {days.map((day, index) => (
              <Button
                key={index}
                type="button"
                width="40px"
                height="40px"
                display="flex"
                alignItems="center"
                justifyContent="center"
                borderRadius="full"
                color="gray.600"
                cursor="pointer"
                bg={
                  day !== null &&
                  day === currentDate.date() &&
                  currentDate.year() === new Date().getFullYear() &&
                  currentDate.month() === new Date().getMonth()
                    ? "blue.500"
                    : day !== null &&
                        selectedDate ===
                          currentDate.date(day).format("YYYY-MM-DD")
                      ? "green.500"
                      : "transparent"
                }
                _hover={{
                  bg: "gray.100",
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
                    width="40px"
                    height="40px"
                    display="flex"
                    color={
                      (day !== null &&
                        day === currentDate.date() &&
                        currentDate.year() ===
                          new Date().getFullYear() &&
                        currentDate.month() ===
                          new Date().getMonth()) ||
                      selectedDate ===
                        currentDate.date(day).format("YYYY-MM-DD")
                        ? "white"
                        : "gray.700"
                    }
                    alignItems="center"
                    justifyContent="center"
                    lineHeight={1}
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
