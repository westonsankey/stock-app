import axios from "../../../common/axios";
import { useEffect, useState } from "react";

type TRecommendedSymbol = {
  score: number;
  symbol: string;
};

export const useGetSimilarStocks = (symbol: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState<string[]>([]);

  const apiKey = process.env.REACT_APP_YAHOO_FINANCE_API_KEY;

  if (!apiKey) {
    throw Error("No API key");
  }

  useEffect(() => {
    const getData = async () => {
      setLoading(true);

      const response = await axios.get(
        `https://yfapi.net/v6/finance/recommendationsbysymbol/${symbol}`,
        {
          headers: {
            "X-API-KEY": apiKey,
          },
        }
      );

      const recommendedSymbols = response.data.finance.result[0]
        .recommendedSymbols as TRecommendedSymbol[];

      setData(recommendedSymbols.map((rs) => rs.symbol));
    };

    getData();
    setLoading(false);
  }, [symbol]);

  return { loading, error, data };
};
