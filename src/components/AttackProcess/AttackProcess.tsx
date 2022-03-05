import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import Collapse from "@mui/material/Collapse";
import { Box, Button, Checkbox, FormControlLabel } from "@mui/material";
import { NodeProperties } from "../../utils/enums/NodeProperties";
import CollapseInputText from "../CollapseInputText/CollapseInputText";
import { Host } from "../../utils/classes/Host";
import { Vulnerbility } from "../../utils/classes/Vulnerbility";
import clone from "clone";
import { bindActionCreators } from "@reduxjs/toolkit";
import { hostActionCreators } from "../../redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

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

  return (
    <List
      sx={{
        width: "100%",
        maxHeight: 500,
        bgcolor: "grey.A100",
        overflow: "auto",
        borderRadius: "10px",
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
            {hostInput ? (open ? "Thu lại" : "Mở rộng") : "Hãy chọn host"}
          </Button>
        </ListSubheader>
      }
    >
      <Collapse in={open && hostInput != null} timeout="auto" unmountOnExit>
        
      </Collapse>
    </List>
  );
}
