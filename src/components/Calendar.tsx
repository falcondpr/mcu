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
      <Flex
        py={3}
        px={2.5}
        justifyContent="space-between"
        alignItems="center"
      >
        {viewMode === "calendar" && (
          <>
            <Button
              rounded="full"
              p={0}
              color="gray.600"
              _hover={{
                color: "gray.900",
                bgColor: "gray.200",
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
                  color: "gray.500",
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
                  color: "gray.500",
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
              rounded="full"
              p={0}
              color="gray.800"
              _hover={{
                bgColor: "gray.200",
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
            p={0}
            columnGap={3}
            _hover={{
              color: "gray.500",
            }}
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
        <Grid
          gridTemplateColumns="repeat(3,1fr)"
          gap={4}
          px={3}
          pb={3}
        >
          {months.map((month, index) => (
            <Button
              key={month}
              onClick={() => handleMonthSelect(index)}
              outlineOffset={2}
              outline={
                index === new Date().getMonth()
                  ? "1.5px dashed #0F1923"
                  : "none"
              }
              bg={
                index === currentDate.month() ? "#0F1923" : "#F2F2F2"
              }
              color={
                index === currentDate.month() ? "white" : "gray.700"
              }
              rounded="full"
              fontSize="sm"
              _hover={{
                bgColor: "#bfbfbf",
                color: "white",
              }}
            >
              {month}
            </Button>
          ))}
        </Grid>
      )}

      {viewMode === "year" && (
        <Grid
          gridTemplateColumns="repeat(3,1fr)"
          gap={4}
          px={3}
          pb={3}
        >
          {years.map((year) => (
            <Button
              key={year}
              bg={year === currentDate.year() ? "#0F1923" : "#F2F2F2"}
              color={
                year === currentDate.year() ? "white" : "#0F1923"
              }
              outlineOffset={2}
              outline={
                +year === Number(new Date().getFullYear())
                  ? "1.5px dashed #0F1923"
                  : "none"
              }
              fontSize="sm"
              rounded="full"
              _hover={{
                bgColor: "#bfbfbf",
                color: "white",
              }}
              onClick={() => handleYearSelect(year)}
            >
              {year}
            </Button>
          ))}
        </Grid>
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
                p={0}
                height="40px"
                display="flex"
                alignItems="center"
                justifyContent="center"
                borderRadius="full"
                color="gray.600"
                cursor="pointer"
                bg={
                  day === dayjs(selectedDate).get("date") &&
                  dayjs(currentDate).get("month") ===
                    dayjs(selectedDate).get("month") &&
                  dayjs(currentDate).get("year") ===
                    dayjs(selectedDate).get("year")
                    ? "green.500"
                    : day !== null &&
                        day === currentDate.date() &&
                        currentDate.year() ===
                          new Date().getFullYear() &&
                        currentDate.month() === new Date().getMonth()
                      ? "#0F1923"
                      : "transparent"
                }
                _hover={{
                  bg: "gray.300",
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
                    _hover={{
                      color: "inherit",
                    }}
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
