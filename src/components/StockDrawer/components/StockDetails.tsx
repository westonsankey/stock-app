import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Text,
} from "@chakra-ui/react";

import { SimilarStocks } from "./SimilarStocks";

type TStockDetailsProps = {
  symbol: string;
  businessSummary: string;
  addStock: (symbol: string) => void;
};

export const StockDetails: React.FC<TStockDetailsProps> = ({
  symbol,
  businessSummary,
  addStock,
}) => {
  return (
    <Accordion allowMultiple>
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              <Text fontSize="xl" fontWeight="bold">
                Company Profile
              </Text>
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>{businessSummary}</AccordionPanel>
      </AccordionItem>

      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              <Text fontSize="xl" fontWeight="bold">
                Similar Stocks
              </Text>
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <SimilarStocks symbol={symbol} addStock={addStock} />
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};
