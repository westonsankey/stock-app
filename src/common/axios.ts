import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";
import {
  mockAppleResponse,
  mockGoogleResponse,
  mockSnapResponse,
  mockTwitterResponse,
  mockAppleSimilarStocksResponse,
} from "../mock/index.mock";

if (process.env.REACT_APP_USE_MOCK_API === "true") {
  const mockAdapter = new AxiosMockAdapter(axios, { delayResponse: 0 });

  mockAdapter
    .onGet("https://yfapi.net/v11/finance/quoteSummary/AAPL")
    .reply(200, mockAppleResponse);

  mockAdapter
    .onGet("https://yfapi.net/v11/finance/quoteSummary/GOOG")
    .reply(200, mockGoogleResponse);

  mockAdapter
    .onGet("https://yfapi.net/v11/finance/quoteSummary/SNAP")
    .reply(200, mockSnapResponse);

  mockAdapter
    .onGet("https://yfapi.net/v11/finance/quoteSummary/TWTR")
    .reply(200, mockTwitterResponse);

  mockAdapter
    .onGet("https://yfapi.net/v6/finance/recommendationsbysymbol/AAPL")
    .reply(200, mockAppleSimilarStocksResponse);
}

export default axios;
