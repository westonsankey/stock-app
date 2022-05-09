import { Box, Flex } from "@chakra-ui/react";
import { AddStockButton } from "../AddStockButton";
import {
  RefreshButton,
  RefreshInterval,
  TRefreshInterval,
} from "../RefreshButton/RefreshButton";

type TToolbarProps = {
  addStock: (symbol: string) => void;
  refreshInterval: TRefreshInterval | undefined;
  setRefreshInterval: React.Dispatch<React.SetStateAction<TRefreshInterval>>;
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
