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
            borderRadius="xl"
            color={
              isSelected(day)
                ? "white"
                : {
                    _dark: "gray.400",
                    _light: "gray.600",
                  }
            }
            cursor="pointer"
            bg={
              isSelected(day)
                ? {
                    _light: "gray.800",
                    _dark: "black",
                  }
                : day
                  ? {
                      _dark: "gray.800",
                      _light: "gray.200",
                    }
                  : "transparent"
            }
            _hover={{
              bg: { _dark: "gray.500", _light: "gray.600" },
              color: "white",
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
