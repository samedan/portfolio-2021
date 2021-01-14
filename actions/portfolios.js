import axios from "axios";
import { useState } from "react";

function createPortfolio(data) {
  return axios.post("/api/v1/portfolios", data);
}

export function useCreatePortfolio() {
  const [reqState, setReqState] = useState({
    error: null,
    data: null,
    loading: false,
  });

  const _createPortfolioHandler = async (...data) => {
    setReqState({ error: null, data: null, loading: true });
    try {
      const json = await createPortfolio(...data);
      setReqState({ error: null, data: json.data, loading: false });
    } catch (error) {
      const errorMessage =
        (error.response && error.response.message) || "Oops, smth went wrong";
      setReqState({ error: errorMessage, data: null, loading: false });
    }
  };

  return [_createPortfolioHandler, { ...reqState }];
}
