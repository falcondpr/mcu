import { useState } from "react";
import { Box } from "@chakra-ui/react";
import { createFileRoute } from "@tanstack/react-router";

import Calendar from "../components/Calendar";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [selectedDate, setSelectedDate] = useState<string | null>(
    new Date().toISOString()
  );

  const handleSelectedDate = (date: string) => {
    setSelectedDate(date);
  };

  return (
    <Box mt={8} w="90%" mx="auto">
      <Calendar
        selectedDate={selectedDate}
        onSelectDate={handleSelectedDate}
      />
    </Box>
  );
}
