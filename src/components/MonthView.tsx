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
          outline={
            index === new Date().getMonth()
              ? "1.5px dashed #0F1923"
              : "none"
          }
          bg={index === currentDate.month() ? "#0F1923" : "#F2F2F2"}
          color={index === currentDate.month() ? "white" : "gray.700"}
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
  );
}
