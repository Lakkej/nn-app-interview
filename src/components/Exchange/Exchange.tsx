import { Button, TextField, Typography } from "@mui/material";
import { SymbolsSelect } from "../SymbolsSelect";
import { useState } from "react";
import { useConvert } from "../../hooks";

type ExchangeProps = {
  symbols: { [key: string]: string } | undefined;
};

export const Exchange = ({ symbols }: ExchangeProps) => {
  const [to, setTo] = useState("EUR");
  const [from, setFrom] = useState("USD");
  const [amount, setAmount] = useState(0);
  const [convertedAmount, setConvertedAmount] = useState<number | undefined>(
    undefined
  );

  const { convert } = useConvert();

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const convertedAmount = await convert(from, to, amount);
    setConvertedAmount(convertedAmount);

  const onAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(event.target.value));
  };

  if (symbols === undefined) {
    return <div>Loading Symbols...</div>;
  }

  return (
    <form>
      <SymbolsSelect symbols={symbols} symbol={to} setSymbol={setTo} />
      <SymbolsSelect symbols={symbols} symbol={from} setSymbol={setFrom} />
      <TextField
        id="outlined-basic"
        label="Amount"
        variant="outlined"
        value={amount}
        onChange={onAmountChange}
      />
      <Button variant="contained" onClick={}>
        Submit
      </Button>

      <Typography>
        {convertedAmount === undefined
          ? ""
          : `Convert ${amount} ${from} to ${to} equals ${convertedAmount}`}
      </Typography>
    </form>
  );
};
