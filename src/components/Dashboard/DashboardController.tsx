import { useEffect, useState } from "react";
import { TStockData } from "../StockCard";
import { DashboardView } from "./DashboardView";
import {
  RefreshInterval,
  TRefreshInterval,
} from "../RefreshButton/RefreshButton";
import { useRefreshData } from "../../hooks/useRefreshData";

export const DashboardController = () => {
  const [tickerSymbols, setTickerSymbols] = useState<string[]>(["AAPL"]);
  const [stockData, setStockData] = useState<Record<string, TStockData>>({});
  const [refreshInterval, setRefreshInterval] = useState<TRefreshInterval>(
    RefreshInterval.INTERVAL_1_MINUTE
  );

  const { data, loading, error } = useRefreshData(
    tickerSymbols,
    refreshInterval
  );

  useEffect(() => {
    if (data) {
      setStockData(
        data.reduce((acc, stock) => {
          acc[stock.ticker] = stock;
          return acc;
        }, {} as Record<string, TStockData>)
      );
    }
  }, [data]);

  const addStock = (symbol: string) => {
    setTickerSymbols((prev) => {
      return [...prev, symbol];
    });
  };

  const removeStock = (symbol: string) => {
    setTickerSymbols((prev) => {
      return prev.filter((s) => s !== symbol);
    });

    setStockData((prev) => {
      const current = { ...prev };
      delete current[symbol];

      return current;
    });
  };

  return (
    <DashboardView
      data={stockData}
      addStock={addStock}
      removeStock={removeStock}
      refreshInterval={refreshInterval}
      setRefreshInterval={setRefreshInterval}
      loading={loading}
    />
  );
};
