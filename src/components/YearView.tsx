import { Button, Grid } from "@chakra-ui/react";
import { Dayjs } from "dayjs";

interface YearViewProps {
  currentDate: Dayjs;
  years: number[];
  handleYearSelect: (year: number) => void;
}

export default function YearView({
  years,
  currentDate,
  handleYearSelect,
}: YearViewProps) {
  return (
    <Grid gridTemplateColumns="repeat(3,1fr)" gap={4} px={3} pb={3}>
      {years.map((year) => (
        <Button
          key={year}
          bg={year === currentDate.year() ? "#0F1923" : "#F2F2F2"}
          color={year === currentDate.year() ? "white" : "#0F1923"}
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
  );
}
