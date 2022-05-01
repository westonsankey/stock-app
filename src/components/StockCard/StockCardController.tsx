import { StockCardView } from "./StockCardView";
import { TStockData } from "./types";

type TStockCardParams = {
  data: TStockData;
  addStock: (symbol: string) => void;
  removeStock: (symbol: string) => void;
};

export const StockCardController: React.FC<TStockCardParams> = ({
  data,
  addStock,
  removeStock,
}) => {
  return (
    <StockCardView data={data} addStock={addStock} removeStock={removeStock} />
  );
};
