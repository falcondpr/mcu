import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import * as stylex from "@stylexjs/stylex";

import Calendar from "../components/Calendar";

export const Route = createFileRoute("/")({
  component: Index,
});

const styles = stylex.create({
  base: {
    lineHeight: 1.5,
    color: "rgb(60,60,60)",
  },
  paragraph: {
    fontSize: 18,
    color: "rgb(60,60,60)",
    fontFamily: "Arial",
  },
});

function Index() {
  const [selectedDate, setSelectedDate] = useState<string | null>(
    new Date().toISOString()
  );

  const handleSelectedDate = (date: string) => {
    setSelectedDate(date);
  };

  return (
    <div className="max-w-xl mx-auto my-10">
      <Calendar
        selectedDate={selectedDate}
        onSelectDate={handleSelectedDate}
      />
      <div {...stylex.props(styles.base)}>
        <h1 {...stylex.props(styles.paragraph)}>hello world</h1>
      </div>
    </div>
  );
}
