import { Box, Flex } from "@chakra-ui/react";
import { AddStockButton } from "../AddStockButton";
import { RefreshButton, RefreshInterval } from "../RefreshButton/RefreshButton";

type TToolbarProps = {
  addStock: (symbol: string) => void;
  refreshInterval: RefreshInterval | undefined;
  setRefreshInterval: React.Dispatch<
    React.SetStateAction<RefreshInterval | undefined>
  >;
};

export const Toolbar: React.FC<TToolbarProps> = ({
  addStock,
  refreshInterval,
  setRefreshInterval,
}) => {
  return (
    <Flex justifyContent="flex-start" ml="30px" pt="30px">
      <AddStockButton addStock={addStock} />
      <Box ml={8}>
        <RefreshButton
          refreshInterval={refreshInterval}
          setRefreshInterval={setRefreshInterval}
        />
      </Box>
    </Flex>
  );
};
