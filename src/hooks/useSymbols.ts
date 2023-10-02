import { useEffect, useMemo, useState } from "react";
import { myHeaders } from "../consts";

export const useSymbols = () => {
  const [symbols, setSymbols] = useState<
    { [key: string]: string } | undefined
  >();
  const requestOptions: RequestInit = useMemo(
    () => ({
      method: "GET",
      redirect: "follow",
      headers: myHeaders,
    }),
    []
  );

  useEffect(() => {
    fetch("https://api.apilayer.com/exchangerates_data/symbols", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if ("symbols" in result) {
          setSymbols(result.symbols);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, [requestOptions]);

  return { symbols };
};
