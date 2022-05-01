import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
} from "@chakra-ui/react";
import { TStockData } from "../StockCard/types";
import { Chart } from "./components/Chart";
import { StockDetails } from "./components/StockDetails";

type TStockDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  data: TStockData;
  addStock: (symbol: string) => void;
};

export const StockDrawer: React.FC<TStockDrawerProps> = ({
  isOpen,
  onClose,
  data,
  addStock,
}: TStockDrawerProps) => {
  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="xl">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>
          {data.ticker} - {data.companyName}
        </DrawerHeader>

        <DrawerBody>
          <Flex direction="column">
            <Chart history={data.history} />
            <StockDetails
              symbol={data.ticker}
              businessSummary={data.businessSummary}
              addStock={addStock}
            />
          </Flex>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
