import { Box, Button, Flex } from "@chakra-ui/react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { Dayjs } from "dayjs";

import { ViewMode } from "./Calendar";

interface HeaderProps {
  viewMode: ViewMode;
  currentDate: Dayjs;
  setViewMode: (value: ViewMode) => void;
  handlePrevMonth: () => void;
  handleNextMonth: () => void;
}

export default function Header({
  viewMode,
  currentDate,
  setViewMode,
  handlePrevMonth,
  handleNextMonth,
}: HeaderProps) {
  return (
    <Flex
      py={3}
      px={2.5}
      justifyContent="space-between"
      alignItems="center"
    >
      {viewMode === "calendar" && (
        <>
          <Button
            rounded="full"
            p={0}
            color="gray.600"
            _hover={{
              color: "gray.900",
              bgColor: "gray.200",
            }}
            onClick={handlePrevMonth}
            bgColor="transparent"
          >
            <FaAngleLeft />
          </Button>
          <Flex gapX={2}>
            <Button
              color="gray.800"
              _hover={{
                color: "gray.500",
              }}
              onClick={() => setViewMode("month")}
              fontSize="lg"
              fontWeight="bold"
              bgColor="transparent"
              px="0"
            >
              {currentDate.format("MMMM")}
            </Button>
            <Button
              color="gray.800"
              _hover={{
                color: "gray.500",
              }}
              fontSize="lg"
              fontWeight="bold"
              onClick={() => setViewMode("year")}
              bgColor="transparent"
              px="0"
            >
              {currentDate.format("YYYY")}
            </Button>
          </Flex>
          <Button
            rounded="full"
            p={0}
            color="gray.800"
            _hover={{
              bgColor: "gray.200",
              color: "gray.900",
            }}
            onClick={handleNextMonth}
            bgColor="transparent"
          >
            <FaAngleRight />
          </Button>
        </>
      )}

      {viewMode !== "calendar" && (
        <Button
          display="flex"
          bg="transparent"
          alignItems="center"
          onClick={() => setViewMode("calendar")}
          color="gray.800"
          ml={3}
          p={0}
          columnGap={3}
          _hover={{
            color: "gray.500",
          }}
        >
          <FaAngleLeft color="inherit" />
          <Box
            color="inherit"
            display="flex"
            alignItems="center"
            fontWeight="semibold"
            as="span"
            fontSize="lg"
            lineHeight={1.5}
            height="40px"
          >
            Volver
          </Box>
        </Button>
      )}
    </Flex>
  );
}
