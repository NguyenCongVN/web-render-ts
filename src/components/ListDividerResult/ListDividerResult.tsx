import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/reducers/RootReducer";
import { Box } from "@mui/material";
import { bindActionCreators } from "@reduxjs/toolkit";
import { attackProcessActionCreators } from "../../redux";
import { CommandType } from "../../utils/enums/CommandType";
interface ListDividerProps {
  shell?: boolean;
  meterpreter?: boolean;
}

export default function ListDividers({ shell, meterpreter }: ListDividerProps) {
  const attackProcessState = useSelector(
    (state: RootState) => state.attackProcess
  );

  const dispatch = useDispatch();

  const { openCommand, setSelectedCommand } = bindActionCreators(
    attackProcessActionCreators,
    dispatch
  );

  const renderItems = () => {
    if (shell) {
      return attackProcessState.processes.map((process) => {
        return process.shellNumberGot.map((shellGot) => {
          return (
            <Box>
              <ListItem
                button
                divider
                onDoubleClick={() => {
                  setSelectedCommand(shellGot);
                  openCommand();
                }}
              >
                <ListItemText primary={`${process.hostLable} : ${shellGot}`} />
              </ListItem>
            </Box>
          );
        });
      });
    }

    if (meterpreter) {
      return attackProcessState.processes.map((process) => {
        return process.meterpreterGot.map((meterpreterGot) => {
          return (
            <Box>
              <ListItem
                button
                divider
                onDoubleClick={() => {
                  setSelectedCommand(meterpreterGot);
                  openCommand();
                }}
              >
                <ListItemText
                  primary={`${process.hostLable} : ${meterpreterGot}`}
                />
              </ListItem>
            </Box>
          );
        });
      });
    }
  };

  return (
    <List
      sx={{ display: "flex", flex: 1, flexDirection: "column", flexGrow: 1 }}
      component="nav"
    >
      {renderItems()}
    </List>
  );
}
