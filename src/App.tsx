import "./App.css";
import { Exchange, History, Rates, Tabs } from "./components";
import { useSymbols } from "./hooks";

function App() {
  const symbols = useSymbols();

  return (
    <div className="App">
      {symbols === undefined ? (
        <div>Loading Symbols...</div>
      ) : (
        <Tabs
          Exchange={<Exchange symbols={symbols} />}
          History={<History symbols={symbols} />}
          Rates={<Rates symbols={symbols} />}
        />
      )}
    </div>
  );
}

export default App;
