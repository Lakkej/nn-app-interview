import { useState } from "react";
import { SymbolsSelect } from "../common";
import { Box, Button, Container, TextField } from "@mui/material";
import { useApi } from "../../hooks";

type RatesProps = {
  symbols: { [key: string]: string };
};

export const Rates = ({ symbols }: RatesProps) => {
  const [symbol, setSymbol] = useState("EUR");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [rates, setRates] = useState<undefined>(undefined);
  const { getRates } = useApi();

  const onSubmit = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    const rates = await getRates(date, symbol);
    setRates(rates);
  };

  const onDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(new Date(event.target.value).toISOString().split("T")[0]);
  };

  return (
    <Box
      component={"form"}
      sx={{
        height: "100%",
        gap: "10px",
      }}
    >
      <SymbolsSelect
        symbols={symbols}
        name="Rates for"
        symbol={symbol}
        setSymbol={setSymbol}
      />
      <TextField
        type="date"
        value={date}
        onChange={onDateChange}
        inputProps={{
          max: new Date().toISOString().split("T")[0],
          min: "1999-01-01",
        }}
        sx={{ width: "250px" }}
      />
      <Button
        variant="contained"
        onClick={onSubmit}
        sx={{
          width: "250px",
        }}
      >
        Submit
      </Button>
      <Container
        sx={{
          maxHeight: "calc(100vh - 600px)",
          overflow: "auto",
        }}
      >
        <ul>
          {rates === undefined
            ? ""
            : Object.entries(rates).map(([key, value]) => (
                <li key={key}>{`${key}: ${Number(value).toFixed(3)}`}</li>
              ))}
        </ul>
      </Container>
    </Box>
  );
};
