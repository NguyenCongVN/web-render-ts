import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/reducers/RootReducer";

interface ListDividerProps {
  shell?: boolean;
  meterpreter?: boolean;
}

export default function ListDividers({ shell, meterpreter }: ListDividerProps) {
  const attackProcessState = useSelector(
    (state: RootState) => state.attackProcess
  );

  const renderItems = () => {
    if (shell) {
      return attackProcessState.processes.map((process) => {
        return process.shellNumberGot.map((shellGot) => {
          return (
            <ListItem button divider>
              <ListItemText primary={`${process.hostLable} : ${shellGot}`} />
            </ListItem>
          );
        });
      });
    }

    if (meterpreter) {
      return attackProcessState.processes.map((process) => {
        return process.meterpreterGot.map((meterpreterGot) => {
          return (
            <ListItem button divider>
              <ListItemText
                primary={`${process.hostLable} : ${meterpreterGot}`}
              />
            </ListItem>
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
