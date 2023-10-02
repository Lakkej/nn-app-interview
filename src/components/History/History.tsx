import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useApi } from "../../hooks";
import { useState } from "react";
import { FromToSelect } from "../common";

type HistoryProps = {
  symbols: { [key: string]: string };
};

export const History = ({ symbols }: HistoryProps) => {
  const [to, setTo] = useState("EUR");
  const [from, setFrom] = useState("USD");
  const [start, setStart] = useState(1);
  const [end, setEnd] = useState(1);
  const [rates, setRates] = useState<any | undefined>(undefined);

  const { getHistory } = useApi();

  const onSubmit = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    const rates = await getHistory(start, end, from, to);
    setRates(rates);
  };

  const onStartChange = (event: SelectChangeEvent<number>) => {
    setStart(Number(event.target.value));
  };

  const onEndChange = (event: SelectChangeEvent<number>) => {
    setEnd(Number(event.target.value));
  };

  if (symbols === undefined) {
    return <div>Loading Symbols...</div>;
  }

  return (
    <form>
      <FromToSelect
        symbols={symbols}
        setFrom={setFrom}
        setTo={setTo}
        from={from}
        to={to}
      />
      <FormControl>
        <InputLabel id="outlined-basic-start">{"Start date"}</InputLabel>
        <Select
          sx={{ width: "250px" }}
          id="outlined-basic-start"
          label="Start Date"
          variant="outlined"
          type="number"
          value={start}
          onChange={onStartChange}
        >
          {Array.from(Array(30).keys()).map((i) => (
            <MenuItem disabled={i + 1 > end} value={i + 1}>{`2023-09-${String(
              i + 1
            ).padStart(2, "0")}`}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel id="outlined-basic-end">{"End date"}</InputLabel>
        <Select
          sx={{ width: "250px" }}
          id="outlined-basic-end"
          label="End Date"
          variant="outlined"
          type="number"
          value={end}
          onChange={onEndChange}
        >
          {Array.from(Array(30).keys()).map((i) => (
            <MenuItem disabled={i + 1 < start} value={i + 1}>{`2023-09-${String(
              i + 1
            ).padStart(2, "0")}`}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button
        variant="contained"
        onClick={onSubmit}
        sx={{
          width: "250px",
        }}
      >
        Submit
      </Button>

      <ul>
        {rates === undefined
          ? ""
          : Object.entries(rates).map(([key, value]: [string, any]) => (
              <li>
                {key}: {Number(value[to]).toFixed(3)}
              </li>
            ))}
      </ul>
    </form>
  );
};
