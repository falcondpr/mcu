import { useState, useEffect } from "react";
import dayjs, { Dayjs } from "dayjs";

type ViewMode = "calendar" | "month" | "year";
type Day = number | null;

interface CalendarProps {
  selectedDate: string | null;
  onSelectDate: (date: string) => void;
}

const Calendar = ({ selectedDate, onSelectDate }: CalendarProps) => {
  const [currentDate, setCurrentDate] = useState<Dayjs>(dayjs());
  const [viewMode, setViewMode] = useState<ViewMode>("calendar");
  const [days, setDays] = useState<Day[]>([]);

  const handleDayClick = (day: Day) => {
    if (day !== null) {
      const selectedDate = currentDate.date(day).format("YYYY-MM-DD");
      onSelectDate(selectedDate);
    }
  };

  const handlePrevMonth = () =>
    setCurrentDate(currentDate.subtract(1, "month"));

  const handleNextMonth = () =>
    setCurrentDate(currentDate.add(1, "month"));

  const handleMonthSelect = (month: number) => {
    setCurrentDate(currentDate.month(month));
    setViewMode("calendar");
  };

  const handleYearSelect = (year: number) => {
    setCurrentDate(currentDate.year(year));
    setViewMode("calendar");
  };

  useEffect(() => {
    const daysInMonth = currentDate.daysInMonth();
    const firstDayOfMonth = currentDate.startOf("month").day();

    const updatedDays: Day[] = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      updatedDays.push(null);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      updatedDays.push(i);
    }

    setDays(updatedDays);
  }, [currentDate]);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const years = Array.from(
    { length: 12 },
    (_, i) => currentDate.year() - 5 + i
  );

  return (
    <div className="w-full max-w-sm mx-auto bg-white rounded-lg shadow-md p-4 dark:bg-gray-800">
      <div className="flex justify-between items-center mb-4">
        {viewMode === "calendar" && (
          <>
            <button
              onClick={handlePrevMonth}
              className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            >
              &lt;
            </button>
            <button
              onClick={() => setViewMode("month")}
              className="text-lg font-bold text-gray-800 dark:text-white"
            >
              {currentDate.format("MMMM")}
            </button>
            <button
              onClick={() => setViewMode("year")}
              className="text-lg font-bold text-gray-800 dark:text-white"
            >
              {currentDate.format("YYYY")}
            </button>
            <button
              onClick={handleNextMonth}
              className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            >
              &gt;
            </button>
          </>
        )}
        {viewMode !== "calendar" && (
          <button
            onClick={() => setViewMode("calendar")}
            className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
          >
            &lt; Back
          </button>
        )}
      </div>

      {viewMode === "month" && (
        <div className="grid grid-cols-3 gap-2">
          {months.map((month, index) => (
            <button
              key={month}
              onClick={() => handleMonthSelect(index)}
              className={`text-lg font-bold text-gray-800 dark:text-white ${
                currentDate.month() === index
                  ? "bg-gray-300 dark:bg-gray-600"
                  : ""
              }`}
            >
              {month}
            </button>
          ))}
        </div>
      )}

      {viewMode === "year" && (
        <div className="grid grid-cols-3 gap-2">
          {years.map((year) => (
            <button
              key={year}
              onClick={() => handleYearSelect(year)}
              className={`p-2 rounded-md text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 ${
                currentDate.year() === year
                  ? "bg-gray-300 dark:bg-gray-600"
                  : ""
              }`}
            >
              {year}
            </button>
          ))}
        </div>
      )}

      {viewMode === "calendar" && (
        <div className="mt-4">
          <div className="grid grid-cols-7 text-center text-sm text-gray-500 dark:text-gray-400">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
              (day, index) => (
                <div key={index}>{day}</div>
              )
            )}
          </div>

          <div className="grid grid-cols-7 gap-2 mt-2">
            {days.map((day, index) => (
              <button
                type="button"
                key={index}
                className={`hover:bg-gray-200 dark:hover:bg-gray-700 h-10 flex items-center justify-center rounded-full cursor-pointer 
                  ${day && day === currentDate.date() ? "bg-blue-500 text-white" : ""}
                  ${day && selectedDate === currentDate.date(day).format("YYYY-MM-DD") ? "bg-green-500 text-white hover:bg-green-500" : ""}
                `}
                onClick={() => day && handleDayClick(day)}
              >
                {day && (
                  <span className="text-white w-8 h-8 flex items-center justify-center rounded-full">
                    {day}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
