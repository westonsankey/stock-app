export type TStockHistoryResponse = {
  [symbol: string]: {
    dataGranularity: number;
    timestamp: number[];
    symbol: string;
    close: number[];
    end: any;
    start: any;
    previousClose: any;
    chartPreviousClose: any;
  };
};

export type TStockHistory = {
  x: string;
  y: number;
}[];

export type TStockData = {
  ticker: string;
  companyName: string;
  regularMarketPrice: number;
  regularMarketChange: number;
  regularMarketChangePercent: number;
  marketCap: string;
  totalRevenue: string;
  revenueGrowth: number;
  grossProfit: string;
  history: TStockHistory;
  businessSummary: string;
  lastRefreshTs: string;
};

export type CardWidget = "QUOTE" | "CHART" | "INFO";
