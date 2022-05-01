import { useGetSimilarStocks } from "../hooks/useGetSimilarStocks";
import { Box, Button, Flex, Spinner } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useToast } from "@chakra-ui/react";
import { useState } from "react";

type TSimilarStocksProps = {
  symbol: string;
  addStock: (symbol: string) => void;
};

type TSymbolButtonProps = {
  symbol: string;
  addStock: (symbol: string) => void;
};

const SymbolButton: React.FC<TSymbolButtonProps> = ({ symbol, addStock }) => {
  const [added, setAdded] = useState(false);
  const toast = useToast();

  const handleButtonClick = () => {
    addStock(symbol);
    setAdded(true);

    toast({
      title: "Stock Added",
      description: "The stock has been added to your favorites",
      variant: "solid",
      duration: 9000,
      isClosable: true,
    });
  };

  return (
    <Button
      disabled={added}
      rightIcon={<AddIcon />}
      variant="solid"
      onClick={handleButtonClick}
    >
      {symbol}
    </Button>
  );
};

export const SimilarStocks: React.FC<TSimilarStocksProps> = ({
  symbol,
  addStock,
}) => {
  const { data, loading, error } = useGetSimilarStocks(symbol);

  if (loading) {
    return (
      <Flex w="100%" justifyContent="center">
        <Spinner bg="primary" />
      </Flex>
    );
  }

  if (error) {
    return <div>You messed up!</div>;
  }

  return (
    <Flex>
      {data.map((symbol) => (
        <Box key={symbol} mr={3}>
          <SymbolButton symbol={symbol} addStock={addStock} />
        </Box>
      ))}
    </Flex>
  );
};
