import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import "./TabCommand.css";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/reducers/RootReducer";
import { CommandType } from "../../utils/enums/CommandType";
interface TabPanelProps {
  children?: React.ReactNode;
  index: string;
  value: string;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      className="command-tab-panel"
      style={{ display: value !== index ? "none" : "flex" }}
    >
      {value === index && (
        <Box
          sx={{
            display: "flex",
            padding: "10px",
            flexDirection: "column",
            flex: 1,
            maxHeight: "100%",
          }}
        >
          <Typography
            sx={{
              display: "block",
              width: "100%",
              wordWrap: "break-word",
              whiteSpace: "break-spaces",
              wordBreak: "break-all",
            }}
          >
            {children}
          </Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: string) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState("31");

  const attackProcessState = useSelector(
    (rootState: RootState) => rootState.attackProcess
  );

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        width: "100%",
      }}
    >
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          {attackProcessState.commands.map((command) => {
            if (command.type === CommandType.Meterpreter) {
              return (
                <Tab
                  label={`Meterpreter ${command.id}`}
                  {...a11yProps(command.id)}
                />
              );
            } else {
              return (
                <Tab label={`Shell ${command.id}`} {...a11yProps(command.id)} />
              );
            }
          })}
        </Tabs>
      </Box>

      {attackProcessState.commands.map((command) => (
        <TabPanel value={value} index={command.id}>
          <Typography variant="caption">
            {">"}
            {command.fullDialog}
          </Typography>
        </TabPanel>
      ))}
    </Box>
  );
}
