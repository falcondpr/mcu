import { Box, Button, Grid } from "@chakra-ui/react";
import { Dayjs } from "dayjs";

export type Day = number | null;

interface DaysViewProps {
  selectedDate: string | null;
  currentDate: Dayjs;
  handleDayClick: (day: number) => void;
  days: any[];
}

export default function DaysView({
  selectedDate,
  currentDate,
  handleDayClick,
  days,
}: DaysViewProps) {
  const isToday = (day: number) =>
    day === currentDate.date() &&
    currentDate.year() === new Date().getFullYear() &&
    currentDate.month() === new Date().getMonth();

  const isSelected = (day: number) =>
    selectedDate === currentDate.date(day).format("YYYY-MM-DD");

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
            <Box key={index}>{day}</Box>
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
            color={
              isToday(day) || isSelected(day)
                ? {
                    _light: "white",
                    _dark: "white",
                  }
                : {
                    _light: "gray.700",
                    _dark: "gray.400",
                  }
            }
            cursor="pointer"
            bg={
              isSelected(day)
                ? {
                    _light: "green.500",
                    _dark: "green.600",
                  }
                : isToday(day)
                  ? {
                      _light: "#0F1923",
                      _dark: "hsl(210, 40%, 22%)",
                    }
                  : day
                    ? {
                        _light: "#F2F2F2",
                        _dark: "#333",
                      }
                    : "transparent"
            }
            _hover={{
              bg: "gray.300",
              color: "white",
              _dark: {
                bg: isSelected(day) ? "green.500" : "gray.700",
              },
            }}
            onClick={() => handleDayClick(day)}
          >
            <Box
              as="span"
              textAlign="center"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              {day}
            </Box>
          </Button>
        ))}
      </Grid>
    </Box>
  );
}
