import { headers } from "../consts";

export const useApi = () => {
  const convert = async (from: string, to: string, amount: number) => {
    const reponse = await fetch(
      `https://api.apilayer.com/exchangerates_data/convert?to=${to}&from=${from}&amount=${amount}`,
      headers
    );
    const result = await reponse.json();
    if (result.success) {
      return result.result;
    }
    return undefined;
  };

  const getHistory = async (
    start: number,
    end: number,
    from: string,
    to: string
  ) => {
    const response = await fetch(
      `https://api.apilayer.com/exchangerates_data/timeseries?start_date=2023-09-${String(
        start
      ).padStart(2, "0")}&end_date=2023-09-${String(end).padStart(
        2,
        "0"
      )}&base=${from}&symbols=${to}`,
      headers
    );
    const result = await response.json();
    if (result.success) {
      return result.rates;
    }
    return undefined;
  };

  const getRates = async (date: string, from: string) => {
    const response = await fetch(
      `https://api.apilayer.com/exchangerates_data/${date}?base=${from}`,
      headers
    );

    const result = await response.json();
    if (result.success) {
      return result.rates;
    }
    return undefined;
  };

  return { convert, getHistory, getRates };
};
