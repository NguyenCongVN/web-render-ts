import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/reducers/RootReducer";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import { Box } from "@mui/material";
import "./ListDividerResult.css";
import { bindActionCreators } from "@reduxjs/toolkit";
import { attackProcessActionCreators } from "../../redux";
interface ListDividerProps {
  shell?: boolean;
  meterpreter?: boolean;
}

export default function ListDividers({ shell, meterpreter }: ListDividerProps) {
  const attackProcessState = useSelector(
    (state: RootState) => state.attackProcess
  );

  const dispatch = useDispatch();

  const { openCommand } = bindActionCreators(
    attackProcessActionCreators,
    dispatch
  );

  const renderItems = () => {
    if (shell) {
      return attackProcessState.processes.map((process) => {
        return process.shellNumberGot.map((shellGot) => {
          return (
            <Box>
              <ContextMenuTrigger
                id={`${process.hostLable}.shell${shellGot}`}
                holdToDisplay={1000}
              >
                <ListItem button divider>
                  <ListItemText
                    primary={`${process.hostLable} : ${shellGot}`}
                  />
                </ListItem>
              </ContextMenuTrigger>
              <ContextMenu
                id={`${process.hostLable}.shell${shellGot}`}
                className="context"
              >
                <MenuItem
                  onClick={() => {
                    console.log("1");
                  }}
                  className="context-item"
                >
                  Mở shell
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    openCommand();
                  }}
                  className="context-item"
                >
                  Mở Command Manager
                </MenuItem>
              </ContextMenu>
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
              <ContextMenuTrigger
                id={`${process.hostLable}.meter${meterpreterGot}`}
              >
                <ListItem button divider>
                  <ListItemText
                    primary={`${process.hostLable} : ${meterpreterGot}`}
                  />
                </ListItem>
              </ContextMenuTrigger>
              <ContextMenu
                id={`${process.hostLable}.meter${meterpreterGot}`}
                className="context"
              >
                <MenuItem onClick={() => {}} className="context-item">
                  Mở meterpreter
                </MenuItem>
                <MenuItem onClick={() => {}} className="context-item">
                  Mở Command Manager
                </MenuItem>
              </ContextMenu>
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
