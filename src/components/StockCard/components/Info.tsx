import { Flex, Text } from "@chakra-ui/layout";
import { TStockData } from "../types";

type TInfoProps = Pick<
  TStockData,
  "marketCap" | "totalRevenue" | "revenueGrowth" | "grossProfit"
>;

export const Info: React.FC<TInfoProps> = ({
  marketCap,
  totalRevenue,
  revenueGrowth,
  grossProfit,
}: TInfoProps) => {
  return (
    <Flex ml="35px" pt="15px" h="190px">
      <Flex flexDirection="column">
        <Text mb="10px">Market Cap</Text>
        <Text mb="10px">Total Revenue</Text>
        <Text mb="10px">Revenue Growth</Text>
        <Text mb="10px">Gross Profit</Text>
      </Flex>
      <Flex flexDirection="column" ml="60px">
        <Text fontWeight="bold" mb="10px">
          ${marketCap}
        </Text>
        <Text fontWeight="bold" mb="10px">
          ${totalRevenue}
        </Text>
        <Text fontWeight="bold" mb="10px">
          {revenueGrowth}
        </Text>
        <Text fontWeight="bold" mb="10px">
          ${grossProfit}
        </Text>
      </Flex>
    </Flex>
  );
};
