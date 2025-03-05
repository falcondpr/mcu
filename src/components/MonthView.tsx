import { Button, Grid } from "@chakra-ui/react";
import { Dayjs } from "dayjs";

interface MonthViewProps {
  currentDate: Dayjs;
  handleMonthSelect: (month: number) => void;
  months: string[];
}

export default function MonthView({
  handleMonthSelect,
  currentDate,
  months,
}: MonthViewProps) {
  return (
    <Grid gridTemplateColumns="repeat(3,1fr)" gap={4} px={3} pb={3}>
      {months.map((month, index) => (
        <Button
          key={month}
          onClick={() => handleMonthSelect(index)}
          outlineOffset={2}
          bg={
            index === currentDate.month()
              ? {
                  _light: "gray.900",
                  _dark: "#F2F2F2",
                }
              : {
                  _light: "gray.200",
                  _dark: "gray.800",
                }
          }
          color={
            index === currentDate.month()
              ? {
                  _light: "white",
                  _dark: "gray.700",
                }
              : {
                  _light: "gray.700",
                  _dark: "white",
                }
          }
          rounded="xl"
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
  );
}
