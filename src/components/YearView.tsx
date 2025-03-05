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
    <Grid gridTemplateColumns="repeat(4,1fr)" gap={4} px={3} pb={3}>
      {years.map((year) => (
        <Button
          key={year}
          bg={
            year === currentDate.year()
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
            year === currentDate.year()
              ? {
                  _light: "white",
                  _dark: "gray.900",
                }
              : {
                  _light: "gray.900",
                  _dark: "white",
                }
          }
          outlineOffset={2}
          fontSize="sm"
          rounded="xl"
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
