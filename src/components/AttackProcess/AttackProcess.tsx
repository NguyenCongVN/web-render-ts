import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import Collapse from "@mui/material/Collapse";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  LinearProgress,
} from "@mui/material";
import { NodeProperties } from "../../utils/enums/NodeProperties";
import CollapseInputText from "../CollapseInputText/CollapseInputText";
import { Host } from "../../utils/classes/Host";
import { Vulnerbility } from "../../utils/classes/Vulnerbility";
import clone from "clone";
import { bindActionCreators } from "@reduxjs/toolkit";
import { hostActionCreators } from "../../redux";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import AttackProcessResultTab from "../AttackProcessResultTab/AttackProcessResultTab";
import { CalculateProcessPercent } from "../../utils/socket_utils/calc_percent_utils";
import { RootState } from "../../redux/reducers/RootReducer";
interface NodeDetailProps {
  hostInput: Host | undefined;
}

export default function AttackProcess({ hostInput }: NodeDetailProps) {
  const dispatch = useDispatch();
  const { updateDraftHostPending } = bindActionCreators(
    hostActionCreators,
    dispatch
  );

  // redux action
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  const attackProcessState = useSelector(
    (rootState: RootState) => rootState.attackProcess.processes
  );

  return (
    <Box sx={{ position: "relative", bottom: "0" }}>
      <LinearProgress
        variant="determinate"
        value={CalculateProcessPercent(attackProcessState)}
      />
      <List
        sx={{
          width: "100%",
          maxHeight: 500,
          bgcolor: "grey.A100",
          overflow: "auto",
          borderRadius: "10px",
          height: "100%",
        }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader
            component="div"
            id="nested-list-subheader"
            sx={{ bgcolor: "grey.A100", display: "flex" }}
          >
            Tiến trình tấn công
            <Button
              sx={{ margin: "auto 0 auto auto", height: "70%" }}
              size="small"
              variant="outlined"
              onClick={() => {
                handleClick();
              }}
            >
              {open ? "Thu lại" : "Mở rộng"}
            </Button>
          </ListSubheader>
        }
      >
        <Collapse in={open} timeout="auto" unmountOnExit>
          <AttackProcessResultTab />
        </Collapse>
      </List>
    </Box>
  );
}
