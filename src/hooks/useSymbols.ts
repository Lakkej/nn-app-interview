import { useEffect, useState } from "react";
import { headers } from "../consts";

const useSymbols = () => {
  const [symbols, setSymbols] = useState<{ [key: string]: string } | undefined>(
    undefined
  );

  useEffect(() => {
    const fetchSymbols = async () => {
      try {
        const response = await fetch(
          "https://api.apilayer.com/exchangerates_data/symbols",
          headers
        );
        const result = await response.json();

        if (result.success) {
          setSymbols(result.symbols);
        }
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchSymbols();
  }, []);

  return symbols;
};

export { useSymbols };
