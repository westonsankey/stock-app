import { useEffect, useState } from "react";
import { mockHistory } from "../../mock/index.mock";
import { TStockData, TStockHistory, TStockHistoryResponse } from "../StockCard";
import { DashboardView } from "./DashboardView";
import axios from "../../common/axios";
import { DateTime } from "luxon";

const timestampToDate = (timestamp: number) => {
  const date = DateTime.fromMillis(timestamp * 1000);
  return `${date.monthShort} ${date.day}, ${date.year}`;
};

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

  const data: TStockData = {
    companyName: response.data.quoteSummary.result[0].price.shortName,
    ticker: response.data.quoteSummary.result[0].price.symbol,
    grossProfit:
      response.data.quoteSummary.result[0].financialData.grossProfits.fmt,
    marketCap: response.data.quoteSummary.result[0].summaryDetail.marketCap.fmt,
    regularMarketChange:
      response.data.quoteSummary.result[0].price.regularMarketChange.fmt,
    regularMarketChangePercent:
      response.data.quoteSummary.result[0].price.regularMarketChangePercent.fmt,
    regularMarketPrice:
      response.data.quoteSummary.result[0].price.regularMarketPrice.fmt,
    revenueGrowth:
      response.data.quoteSummary.result[0].financialData.revenueGrowth.fmt,
    totalRevenue:
      response.data.quoteSummary.result[0].financialData.totalRevenue.fmt,
    history: transformHistory("AAPL", mockHistory),
    businessSummary:
      response.data.quoteSummary.result[0].assetProfile.longBusinessSummary,
    lastRefreshTs: DateTime.now().millisecond,
  };

  return data;
};

export const DashboardController = () => {
  const [tickerSymbols, setTickerSymbols] = useState<string[]>(["AAPL"]);
  const [stockData, setStockData] = useState<Record<string, TStockData>>({});

  const addStock = (symbol: string) => {
    setTickerSymbols((prev) => {
      return [...prev, symbol];
    });
  };

  const removeStock = (symbol: string) => {
    console.log("removing stock", symbol);
    setTickerSymbols((prev) => {
      return prev.filter((s) => s !== symbol);
    });

    setStockData((prev) => {
      const current = { ...prev };
      delete current[symbol];

      return current;
    });
  };

  // TODO: refactor into hook
  useEffect(() => {
    const fetch = async (symbol: string) => {
      const data = await getStockData(symbol);
      setStockData((prev) => {
        return {
          ...prev,
          [symbol]: data,
        };
      });
    };

    tickerSymbols.forEach((symbol) => fetch(symbol));
  }, [tickerSymbols]);

  return (
    <DashboardView
      data={stockData}
      addStock={addStock}
      removeStock={removeStock}
    />
  );
};
