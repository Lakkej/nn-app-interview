import { useEffect, useState } from "react";
import TabsMui from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Paper } from "@mui/material";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

type TabsProps = {
  Exchange: React.ReactNode;
  History?: React.ReactNode;
  Rates?: React.ReactNode;
};

export const Tabs = ({ Exchange, History, Rates }: TabsProps) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    window.addEventListener("hashchange", () => {
      const hash = window.location.hash.slice(1);
      switch (hash) {
        default:
        case "Exchange":
          setValue(0);
          break;
        case "History":
          setValue(1);
          break;
        case "Rates":
          setValue(2);
          break;
      }
    });
  }, [setValue]);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    window.location.hash = ["Exchange", "History", "Rates"][newValue];
    setValue(newValue);
  };
  console.log(value);
  return (
    <Paper sx={{ width: "500px", maxHeight: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <TabsMui
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Exchange" {...a11yProps(0)} />
          <Tab label="History" {...a11yProps(1)} />
          <Tab label="Rates" {...a11yProps(2)} />
        </TabsMui>
      </Box>
      <CustomTabPanel value={value} index={0}>
        {Exchange}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        {History}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        {Rates}
      </CustomTabPanel>
    </Paper>
  );
};
