import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import Calendar from "../components/Calendar";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [selectedDate, setSelectedDate] = useState<string | null>(
    null
  );

  const handleSelectedDate = (date: string) => {
    setSelectedDate(date);
  };

  console.log(selectedDate);

  return (
    <div className="max-w-xl mx-auto my-10">
      <Calendar
        selectedDate={selectedDate}
        onSelectDate={handleSelectedDate}
      />
    </div>
  );
}
