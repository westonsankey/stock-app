import { Box, Input, Text } from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { stocks } from "../../data/stocks";
import styles from "./AutocompleteInput.module.scss";

type TOption = {
  value: string;
  display: string;
};

type TAutocompleteOptionProps = {
  setSelectedStock: (value: string) => void;
  value: string;
  display: string;
};

const AutocompleteOption: React.FC<TAutocompleteOptionProps> = ({
  setSelectedStock,
  value,
  display,
}: TAutocompleteOptionProps) => {
  return (
    <Box
      className={styles.autocompleteOption}
      onClick={() => setSelectedStock(value)}
    >
      <Text className={styles.autocompleteOptionText}>{display}</Text>
    </Box>
  );
};

type TAutocompleteListProps = {
  selectedStock: string | undefined;
  setSelectedStock: (value: string) => void;
  currentValue: string;
  options: TOption[];
};

const AutocompleteList: React.FC<TAutocompleteListProps> = ({
  selectedStock,
  setSelectedStock,
  currentValue,
  options,
}: TAutocompleteListProps) => {
  const filteredOptions =
    currentValue === "" || selectedStock
      ? []
      : options.filter((o) => {
          return o.display.toLowerCase().includes(currentValue.toLowerCase());
        });

  return (
    <div>
      {filteredOptions.slice(0, 7).map((o) => {
        return (
          <AutocompleteOption
            key={o.value}
            value={o.value}
            display={o.display}
            setSelectedStock={setSelectedStock}
          />
        );
      })}
    </div>
  );
};

const parseStockData = (stocks: Record<string, string>): TOption[] => {
  return Object.entries(stocks).map(([k, v]) => {
    return { value: k, display: v };
  });
};

type TAutocompleteInputProps = {
  symbol: string;
  setSymbol: React.Dispatch<React.SetStateAction<string>>;
};

export const AutocompleteInput: React.FC<TAutocompleteInputProps> = ({
  symbol,
  setSymbol,
}: TAutocompleteInputProps) => {
  const [selectedStock, setSelectedStock] = useState<string | undefined>();

  useEffect(() => {
    if (symbol !== selectedStock) {
      setSelectedStock(undefined);
    }
  }, [symbol, selectedStock]);

  const parsedStockOptions = useMemo(() => parseStockData(stocks), [stocks]);

  const handleSelectFromList = (value: string) => {
    setSelectedStock(value);
    setSymbol(value);
  };

  return (
    <Box>
      <Input onChange={(e) => setSymbol(e.target.value)} value={symbol} />
      <AutocompleteList
        selectedStock={selectedStock}
        setSelectedStock={handleSelectFromList}
        options={parsedStockOptions}
        currentValue={symbol}
      />
    </Box>
  );
};
