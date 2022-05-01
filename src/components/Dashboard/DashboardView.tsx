import { Box, Flex } from "@chakra-ui/layout";
import { useDisclosure } from "@chakra-ui/react";
import { AddStockButton } from "../AddStockButton";
import { StockCardController, TStockData } from "../StockCard";

type TDashboardViewProps = {
  data: Record<string, TStockData>;
  addStock: (symbol: string) => void;
  removeStock: (symbol: string) => void;
};

export const DashboardView: React.FC<TDashboardViewProps> = ({
  data,
  addStock,
  removeStock,
}: TDashboardViewProps) => {
  return (
    <Box>
      <Flex justifyContent="flex-end">
        <Box mr="30px" pt="30px">
          <AddStockButton addStock={addStock} />
        </Box>
      </Flex>

      <Flex mt="30px" justifyContent="center">
        <Flex wrap="wrap" justifyContent="flex-start" w="90%">
          {Object.keys(data).map((symbol) => {
            return (
              <StockCardController
                key={symbol}
                data={data[symbol]}
                addStock={addStock}
                removeStock={removeStock}
              />
            );
          })}
        </Flex>
      </Flex>
    </Box>
  );
};
