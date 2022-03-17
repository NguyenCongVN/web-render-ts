import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import ListDividerResult from "../ListDividerResult/ListDividerResult";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
      style={{ display: value !== index ? "none" : "flex", flex: 1 }}
    >
      {value === index && (
        <Box sx={{ display: "flex", flex: 1 }}>{children}</Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Box
        sx={{
          bgcolor: "background.paper",
          display: "flex",
          height: "80%",
          flex: 1,
        }}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: "divider" }}
        >
          <Tab label="Shell" {...a11yProps(0)} />
          <Tab label="Meterpreter" {...a11yProps(1)} />
        </Tabs>
        <TabPanel value={value} index={0}>
          <ListDividerResult shell />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ListDividerResult meterpreter />
        </TabPanel>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "right",
          marginTop: "20px",
        }}
      >
        <Button
          sx={{ marginRight: "15px" }}
          variant="contained"
          onClick={(e) => {}}
        >
          Kết quả dò quét
        </Button>
      </Box>
    </>
  );
}
