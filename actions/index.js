import { useState } from "react";

// cache
export const fetcher = (url) =>
  fetch(url).then(async (res) => {
    const result = await res.json();
    if (res.status !== 200) {
      return Promise.reject(result);
    } else {
      return result;
    }
  });

export function useApiHandler(apiCall) {
  const [reqState, setReqState] = useState({
    error: null,
    data: null,
    loading: false,
  });

  const handler = async (...data) => {
    setReqState({ error: null, data: null, loading: true });
    try {
      const json = await apiCall(...data);
      setReqState({ error: null, data: json.data, loading: false });
    } catch (error) {
      const errorMessage =
        (error.response && error.response.data) || "Oops, something went wrong";
      setReqState({ error: errorMessage, data: null, loading: false });
    }
  };

  return [handler, { ...reqState }];
}
