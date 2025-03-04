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
            rounded="xl"
            p={0}
            color={{
              _light: "gray.600",
              _dark: "gray.200",
            }}
            _hover={{
              color: {
                _light: "gray.900",
                _dark: "gray.200",
              },
              bgColor: {
                _light: "gray.200",
                _dark: "gray.800",
              },
            }}
            onClick={handlePrevMonth}
            bgColor="transparent"
          >
            <FaAngleLeft />
          </Button>
          <Flex gapX={2}>
            <Button
              color={{
                _light: "gray.800",
                _dark: "gray.300",
              }}
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
              color={{
                _light: "gray.800",
                _dark: "gray.300",
              }}
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
            rounded="xl"
            p={0}
            color={{
              _light: "gray.600",
              _dark: "gray.200",
            }}
            _hover={{
              color: {
                _light: "gray.900",
                _dark: "gray.200",
              },
              bgColor: {
                _light: "gray.200",
                _dark: "gray.800",
              },
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
          color={{
            _light: "gray.800",
            _dark: "gray.300",
          }}
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
