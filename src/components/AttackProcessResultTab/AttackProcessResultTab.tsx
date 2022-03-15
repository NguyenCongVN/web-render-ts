import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import VerticalTabs from "../VerticalTab/VerticalTab";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/reducers/RootReducer";
import { Button } from "@mui/material";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      style={{ height: "60%", overflow: "auto" }}
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3, height: "100%" }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function AttackProcessResultTab() {
  const [value, setValue] = React.useState(0);

  const attackProcessState = useSelector(
    (rootState: RootState) => rootState.attackProcess
  );

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Tiến trình" {...a11yProps(0)} />
          <Tab label="Attack Path" {...a11yProps(1)} />
          <Tab label="Kết quả" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <Box sx={{ height: "60vh", overflow: "auto" }}>
        <TabPanel value={value} index={0}>
          <Typography sx={{ whiteSpace: "pre-wrap" }} variant="subtitle2">
            {attackProcessState.detail}
          </Typography>
        </TabPanel>
        <TabPanel value={value} index={1}>
          Attack Path
        </TabPanel>
        <TabPanel value={value} index={2}>
          <VerticalTabs />
        </TabPanel>
      </Box>
    </Box>
  );
}
