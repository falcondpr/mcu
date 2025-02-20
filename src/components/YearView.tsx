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
          bg={
            year === currentDate.year()
              ? {
                  _light: "#0F1923",
                  _dark: "#F2F2F2",
                }
              : {
                  _light: "#F2F2F2",
                  _dark: "#333",
                }
          }
          color={
            year === currentDate.year()
              ? {
                  _light: "white",
                  _dark: "#333",
                }
              : {
                  _light: "#0F1923",
                  _dark: "white",
                }
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
  );
}
