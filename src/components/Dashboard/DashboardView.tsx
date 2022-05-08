import { Box, Flex } from "@chakra-ui/layout";
import { RefreshInterval } from "../RefreshButton/RefreshButton";
import { StockCardController, TStockData } from "../StockCard";
import { Toolbar } from "../Toolbar/Toolbar";

type TDashboardViewProps = {
  data: Record<string, TStockData>;
  addStock: (symbol: string) => void;
  removeStock: (symbol: string) => void;
  refreshInterval: RefreshInterval | undefined;
  setRefreshInterval: React.Dispatch<
    React.SetStateAction<RefreshInterval | undefined>
  >;
  loading: boolean;
};

export const DashboardView: React.FC<TDashboardViewProps> = ({
  data,
  addStock,
  removeStock,
  refreshInterval,
  setRefreshInterval,
  loading,
}: TDashboardViewProps) => {
  return (
    <Box>
      <Toolbar
        addStock={addStock}
        refreshInterval={refreshInterval}
        setRefreshInterval={setRefreshInterval}
      />

      {loading ? (
        <div>Loading</div>
      ) : (
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
      )}
    </Box>
  );
};
