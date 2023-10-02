import { Box } from "@mui/material";
import { SymbolsSelect } from "../SymbolsSelect";

type FromToSelectProps = {
  symbols: { [key: string]: string };
  setFrom: (symbol: string) => void;
  setTo: (symbol: string) => void;
  from: string;
  to: string;
};

export const FromToSelect = ({
  symbols,
  setFrom,
  setTo,
  from,
  to,
}: FromToSelectProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "250px",
      }}
    >
      <SymbolsSelect
        symbols={symbols}
        symbol={from}
        setSymbol={setFrom}
        name="From"
      />
      <SymbolsSelect
        symbols={symbols}
        symbol={to}
        setSymbol={setTo}
        name="To"
      />
    </Box>
  );
};
