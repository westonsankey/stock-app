import { StockCardView } from "./StockCardView";
import { TStockData } from "./types";

type TStockCardParams = {
  data: TStockData;
  removeStock: (symbol: string) => void;
};

export const StockCardController: React.FC<TStockCardParams> = ({
  data,
  removeStock,
}: TStockCardParams) => {
  return <StockCardView data={data} removeStock={removeStock} />;
};
