import axios from "../common/axios";
import {
  TStockData,
  TStockHistory,
  TStockHistoryResponse,
} from "../components/StockCard";
import { mockHistory } from "../mock/index.mock";
import { useEffect, useState } from "react";
import { formatDate, timestampToDate } from "../helpers/date";
import { TRefreshInterval } from "../components/RefreshButton/RefreshButton";

const transformHistory = (
  symbol: string,
  historyResp: TStockHistoryResponse
): TStockHistory => {
  return historyResp[symbol].timestamp.map((ts, i) => {
    return { x: `${timestampToDate(ts)}`, y: historyResp[symbol].close[i] };
  });
};

const getStockData = async (symbol: string) => {
  const apiKey = process.env.REACT_APP_YAHOO_FINANCE_API_KEY;

  if (!apiKey) {
    throw Error("No API key");
  }

  const response = await axios.get(
    `https://yfapi.net/v11/finance/quoteSummary/${symbol}`,
    {
      headers: {
        "X-API-KEY": apiKey,
      },
      params: {
        modules:
          "defaultKeyStatistics,summaryDetail,price,assetProfile,financialData",
      },
    }
  );

  const quote = response.data.quoteSummary.result[0];

  const data: TStockData = {
    companyName: quote.price.shortName,
    ticker: quote.price.symbol,
    grossProfit: quote.financialData.grossProfits.fmt,
    marketCap: quote.summaryDetail.marketCap.fmt,
    regularMarketChange: quote.price.regularMarketChange.fmt,
    regularMarketChangePercent: quote.price.regularMarketChangePercent.fmt,
    regularMarketPrice: quote.price.regularMarketPrice.fmt,
    revenueGrowth: quote.financialData.revenueGrowth.fmt,
    totalRevenue: quote.financialData.totalRevenue.fmt,
    history: transformHistory("AAPL", mockHistory),
    businessSummary: quote.assetProfile.longBusinessSummary,
    lastRefreshTs: formatDate(new Date()),
  };

  return data;
};

export const useRefreshData = (
  symbols: string[],
  refreshInterval: TRefreshInterval
) => {
  const [data, setData] = useState<TStockData[]>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      const promises = symbols.map((symbol) => {
        return getStockData(symbol);
      });

      const stockData = await Promise.all(promises);
      console.log({ stockData });
      setData(stockData);
      setLoading(false);
    };

    // Initial load
    setLoading(true);
    fetch();

    const interval = setInterval(() => {
      if (!loading) {
        setLoading(true);
        fetch();
      }
    }, refreshInterval.intervalMs);

    return () => clearInterval(interval);
  }, [JSON.stringify(symbols), refreshInterval]);

  return { data, loading, error };
};
