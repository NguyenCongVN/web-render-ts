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
import DoneAllIcon from "@mui/icons-material/DoneAll";
import SmsFailedIcon from "@mui/icons-material/SmsFailed";
import PendingIcon from "@mui/icons-material/Pending";
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  tabId: number;
}

function TabPanel(props: TabPanelProps) {
  const attackProcessState = useSelector(
    (rootState: RootState) => rootState.attackProcess
  );

  const { children, value, index, tabId, ...other } = props;
  const divContent = React.useRef<HTMLDivElement>();

  useEffect(() => {
    if (divContent.current) {
      divContent.current.scrollTop = divContent.current.scrollHeight;
    }
  }, [attackProcessState.commands]);

  return (
    <div
      role="tabpanel"
      hidden={value !== tabId}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      className="command-tab-panel"
      style={{ display: value !== tabId ? "none" : "flex" }}
    >
      <Box
        sx={{
          display: "flex",
          padding: "10px",
          flexDirection: "column",
          maxHeight: "100%",
          flex: 1,
        }}
      >
        <Box
          ref={divContent}
          sx={{
            display: "flex",
            flexDirection: "column",
            wordWrap: "break-word",
            whiteSpace: "break-spaces",
            wordBreak: "break-all",
            overflowY: "auto",
          }}
        >
          {children}
        </Box>
      </Box>
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

  const attackProcessState = useSelector(
    (rootState: RootState) => rootState.attackProcess
  );

  const dispatch = useDispatch();

  const { setSelectedCommand } = bindActionCreators(
    attackProcessActionCreators,
    dispatch
  );

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    indexTab = -1;
  }, [attackProcessState.commands]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log(newValue);
    setSelectedCommand(Object.keys(attackProcessState.commands)[newValue]);
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
          value={
            attackProcessState.selectedCommand &&
            Object.keys(attackProcessState.commands).length > 0
              ? attackProcessState.selectedCommand
              : attackProcessState.selectedCommand
              ? Object.keys(attackProcessState.commands)[0]
              : undefined
          }
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          {Object.entries(attackProcessState.commands).map((command) => {
            if (command[1].type === CommandType.Meterpreter) {
              return (
                <Tab
                  label={`Meterpreter ${command[0]}`}
                  {...a11yProps(Number(command[0]))}
                />
              );
            } else {
              return (
                <Tab
                  label={`Shell ${command[0]}`}
                  {...a11yProps(Number(command[0]))}
                />
              );
            }
          })}
        </Tabs>
      </Box>

      {Object.entries(attackProcessState.commands).map((command) => {
        indexTab++;
        return (
          <TabPanel
            value={Number(
              attackProcessState.selectedCommand &&
                Object.keys(attackProcessState.commands).length > 0
                ? attackProcessState.selectedCommand
                : attackProcessState.selectedCommand
                ? Object.keys(attackProcessState.commands)[0]
                : undefined
            )}
            index={indexTab}
            tabId={Number(command[0])}
          >
            {Object.entries(command[1].fullDialog).map((responseOrCommand) => {
              if (responseOrCommand[1].type === "Command") {
                return (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      backgroundColor: "white",
                      padding: "5px",
                      borderRadius: "10px",
                      marginBottom: "2px",
                      flex: 0,
                      alignSelf: "flex-start",
                    }}
                  >
                    <Typography variant="subtitle2" marginRight="2rem">
                      {">"}
                      {responseOrCommand[1].commandRequest}
                      {"\n"}
                    </Typography>
                    {responseOrCommand[1].isSending &&
                      !responseOrCommand[1].isSuccess &&
                      !responseOrCommand[1].isFailed && (
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >
                          <PendingIcon sx={{ transform: `scale(0.6)` }} accentHeight="10px" color="info" />{" "}
                          <Typography variant="caption">đang gửi</Typography>
                        </Box>
                      )}
                    {!responseOrCommand[1].isSending &&
                      responseOrCommand[1].isSuccess &&
                      !responseOrCommand[1].isFailed && (
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >
                          <DoneAllIcon sx={{ transform: `scale(0.6)` }} color="success" />{" "}
                          <Typography variant="caption">thành công</Typography>
                        </Box>
                      )}
                    {!responseOrCommand[1].isSending &&
                      !responseOrCommand[1].isSuccess &&
                      responseOrCommand[1].isFailed && (
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >
                          <SmsFailedIcon sx={{ transform: `scale(0.6)` }} color="error" />{" "}
                          <Typography variant="caption">lỗi</Typography>
                        </Box>
                      )}
                  </Box>
                );
              } else {
                return (
                  <Box sx={{ backgroundColor: "white" }}>
                    <Typography variant="subtitle1">
                      {">"}
                      {responseOrCommand[1].response}
                      {"\n"}
                    </Typography>
                  </Box>
                );
              }
            })}
          </TabPanel>
        );
      })}
    </Box>
  );
}
