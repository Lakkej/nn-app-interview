import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

type SymbolsSelectProps = {
  symbols: { [key: string]: string };
  symbol: string;
  setSymbol: (symbol: string) => void;
};

export const SymbolsSelect = ({
  symbols,
  setSymbol,
  symbol,
}: SymbolsSelectProps) => {
  const handleChange = (event: SelectChangeEvent) => {
    setSymbol(event.target.value as string);
  };

  return (
    <FormControl>
      <InputLabel id="demo-simple-select-label">Age</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={symbol}
        label="Age"
        onChange={handleChange}
      >
        {Object.entries(symbols).map(([key, value]) => (
          <MenuItem title={value} value={key}>
            {key}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
