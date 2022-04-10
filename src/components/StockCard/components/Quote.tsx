import { Flex, Text } from "@chakra-ui/layout";
import { TStockData } from "../types";

type TQuoteProps = Pick<
  TStockData,
  "regularMarketPrice" | "regularMarketChange" | "regularMarketChangePercent"
>;

export const Quote: React.FC<TQuoteProps> = ({
  regularMarketPrice,
  regularMarketChange,
  regularMarketChangePercent,
}: TQuoteProps) => {
  return (
    <Flex flexDir="column" alignItems="center" h="190px">
      <Text mt="55px" fontSize="4xl" fontWeight="bold">
        {`$${regularMarketPrice}`}
      </Text>
      <Flex justifyContent="space-evenly">
        <Text
          fontWeight="bold"
          color={regularMarketChange > 0 ? "#098e22" : "#da4e13"}
        >
          {regularMarketChange} ({regularMarketChangePercent})
        </Text>
      </Flex>
    </Flex>
  );
};
