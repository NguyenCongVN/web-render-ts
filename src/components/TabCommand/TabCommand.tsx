import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import "./TabCommand.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/reducers/RootReducer";
import { CommandType } from "../../utils/enums/CommandType";
import { useEffect } from "react";
import { bindActionCreators } from "@reduxjs/toolkit";
import { attackProcessActionCreators } from "../../redux";
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  tabId: number;
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

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  let indexTab = -1;

  const [value, setValue] = React.useState(0);

  const dispatch = useDispatch();

  const { setSelectedCommand } = bindActionCreators(
    attackProcessActionCreators,
    dispatch
  );

  const attackProcessState = useSelector(
    (rootState: RootState) => rootState.attackProcess
  );

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    indexTab = -1;
  }, [attackProcessState.commands.length]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    console.log(newValue);
    setSelectedCommand(attackProcessState.commands[newValue]);
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
                  {...a11yProps(Number(command.id))}
                />
              );
            } else {
              return (
                <Tab
                  label={`Shell ${command.id}`}
                  {...a11yProps(Number(command.id))}
                />
              );
            }
          })}
        </Tabs>
      </Box>

      {attackProcessState.commands.map((command) => {
        indexTab++;
        return (
          <TabPanel
            value={Number(value)}
            index={indexTab}
            tabId={Number(command.id)}
          >
            <Typography variant="caption">
              {">"}
              {command.responseDialog}
            </Typography>
          </TabPanel>
        );
      })}
    </Box>
  );
}
