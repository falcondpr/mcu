import { useState } from "react";
import { Box, Button, Grid } from "@chakra-ui/react";
import { createFileRoute } from "@tanstack/react-router";

import Calendar from "../components/Calendar";
import { FaMoon, FaSun } from "react-icons/fa6";
import { useColorMode } from "../components/ui/color-mode";
import dayjs, { Dayjs } from "dayjs";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { colorMode, toggleColorMode } = useColorMode();

  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());

  const handleSelectedDate = (date: Dayjs) => {
    setSelectedDate(date);
  };

  console.log(selectedDate.format("DD/MM/YYYY"));

  return (
    <Box mt={8} w="90%" mx="auto">
      <Calendar
        selectedDate={selectedDate}
        onSelectDate={handleSelectedDate}
      />

      <Grid placeItems="center" mt="8">
        <Button
          onClick={toggleColorMode}
          bg="gray.600"
          color="white"
          _hover={{ bg: "gray.500" }}
        >
          {colorMode === "light" ? <FaMoon /> : <FaSun />}
        </Button>
      </Grid>
    </Box>
  );
}
