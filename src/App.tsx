import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Paper } from "@mui/material";
import { Exchange } from "./components";
import { useSymbols } from "./hooks";

function App() {
  const { symbols } = useSymbols();

  return (
    <div className="App">
      <Paper>
        <Exchange symbols={symbols}/>
      </Paper>
    </div>
  );
}

export default App;
