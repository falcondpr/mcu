import { Box, Button, Grid } from "@chakra-ui/react";
import { Dayjs } from "dayjs";

export type Day = number | null;

interface DaysViewProps {
  isPreviousMonthArray: boolean[];
  selectedDate: Dayjs | null;
  currentDate: Dayjs;
  handleDayClick: (day: number, isPreviousMonth: boolean) => void;
  days: any[];
}

export default function DaysView({
  selectedDate,
  currentDate,
  handleDayClick,
  days,
  isPreviousMonthArray,
}: DaysViewProps) {
  const isSelected = (day: number, isPreviousMonth: boolean) => {
    const dateToCompare = isPreviousMonth
      ? currentDate.subtract(1, "month").date(day)
      : currentDate.date(day);

    return selectedDate?.isSame(dateToCompare, "day");
  };

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
        {days.map((day, index) => {
          const isPreviousMonth = isPreviousMonthArray[index];

          return (
            <Button
              key={index}
              type="button"
              width="40px"
              height="40px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              borderRadius="xl"
              border={{
                _dark: isSelected(day, isPreviousMonth)
                  ? "1px solid"
                  : "1px solid",
                _light: isSelected(day, isPreviousMonth)
                  ? "none"
                  : "1px solid",
              }}
              borderColor={{
                _light: "gray.300",
                _dark: "gray.700",
              }}
              color={
                isSelected(day, isPreviousMonth)
                  ? {
                      _dark: "gray.900",
                      _light: "white",
                    }
                  : {
                      _dark: "gray.400",
                      _light: "gray.600",
                    }
              }
              cursor="pointer"
              opacity={
                isSelected(day, isPreviousMonth) && isPreviousMonth
                  ? "0.87"
                  : isPreviousMonth
                    ? "0.4"
                    : ""
              }
              bg={
                isSelected(day, isPreviousMonth)
                  ? {
                      _light: "gray.800",
                      _dark: "gray.100",
                    }
                  : day
                    ? {
                        _dark: "gray.900",
                        _light: "#f7f7f7",
                      }
                    : "transparent"
              }
              _hover={{
                bg: { _dark: "gray.800", _light: "gray.200" },
                color: { _dark: "white", _light: "" },
              }}
              onClick={() => handleDayClick(day, isPreviousMonth)}
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
          );
        })}
      </Grid>
    </Box>
  );
}
