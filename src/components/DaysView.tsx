import { Box, Button, Grid } from "@chakra-ui/react";
import dayjs, { Dayjs } from "dayjs";

import { Day } from "./Calendar";

interface DaysViewProps {
  selectedDate: string | null;
  currentDate: Dayjs;
  handleDayClick: (day: Day) => void;
  days: Day[];
}

export default function DaysView({
  selectedDate,
  currentDate,
  handleDayClick,
  days,
}: DaysViewProps) {
  return (
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
            color={
              (day !== null &&
                day === currentDate.date() &&
                currentDate.year() === new Date().getFullYear() &&
                currentDate.month() === new Date().getMonth()) ||
              selectedDate ===
                currentDate.date(day as number).format("YYYY-MM-DD")
                ? "white"
                : "gray.700"
            }
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
                    currentDate.year() === new Date().getFullYear() &&
                    currentDate.month() === new Date().getMonth()
                  ? "#0F1923"
                  : !day
                    ? "transparent"
                    : "#F2F2F2"
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
  );
}
