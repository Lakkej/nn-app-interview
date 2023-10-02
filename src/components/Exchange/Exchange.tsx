import { Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useApi } from "../../hooks";
import { FromToSelect } from "../common";

type ExchangeProps = {
  symbols: { [key: string]: string };
};

export const Exchange = ({ symbols }: ExchangeProps) => {
  const [to, setTo] = useState("EUR");
  const [from, setFrom] = useState("USD");
  const [amount, setAmount] = useState(0);
  const [convertedAmount, setConvertedAmount] = useState<number | undefined>(
    undefined
  );

  const { convert } = useApi();

  const onSubmit = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    const convertedAmount = await convert(from, to, amount);
    setConvertedAmount(convertedAmount);
  };

  const onAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(event.target.value));
  };

  return (
    <form className="form">
      <FromToSelect
        symbols={symbols}
        setFrom={setFrom}
        setTo={setTo}
        from={from}
        to={to}
      />
      <TextField
        sx={{ width: "250px" }}
        id="outlined-basic"
        label="Amount"
        variant="outlined"
        type="number"
        inputProps={{
          min: 0,
        }}
        value={amount}
        onChange={onAmountChange}
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

      <Typography height={"20px"}>
        {convertedAmount === undefined
          ? ""
          : `It is ${convertedAmount.toFixed(3)}`}
      </Typography>
    </form>
  );
};
