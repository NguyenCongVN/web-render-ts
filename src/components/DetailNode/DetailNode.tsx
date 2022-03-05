import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import Collapse from "@mui/material/Collapse";
import { Box, Button, Checkbox, FormControlLabel } from "@mui/material";
import { NodeProperties } from "../../utils/enums/NodeProperties";
import CollapseInputText from "../CollapseInputText/CollapseInputText";
import { Host } from "../../utils/classes/Host";
import clone from "clone";
import { bindActionCreators } from "@reduxjs/toolkit";
import { hostActionCreators } from "../../redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

interface NodeDetailProps {
  hostInput: Host | undefined;
}

export default function DetailNode({ hostInput }: NodeDetailProps) {
  const [canChooseAttacker, setCanChooseAttacker] = React.useState(
    !hostInput?.isTarget
  );
  const [canChooseTarget, setCanChooseTarget] = React.useState(
    !hostInput?.isAttacker
  );

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

  useEffect(() => {
    setCanChooseAttacker(!hostInput?.isTarget);
    setCanChooseTarget(!hostInput?.isAttacker);
  }, [hostInput]);

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
          Thuộc tính
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
        {hostInput && !hostInput.IsRouter && !hostInput.IsSwitch ? (
          <>
            <CollapseInputText
              property={NodeProperties.Label}
              data={hostInput}
            />
            <CollapseInputText
              property={NodeProperties.NetworkIP}
              data={hostInput}
            />
            <CollapseInputText
              property={NodeProperties.ScanIP}
              data={hostInput}
            />

            {/* CheckBox target or attacker */}
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={hostInput.isTarget}
                    disabled={!canChooseTarget}
                    onChange={(e) => {
                      if (hostInput) {
                        let temp = clone(hostInput);
                        temp.isTarget = e.target.checked ? true : false;
                        updateDraftHostPending(temp);
                        setCanChooseAttacker(!canChooseAttacker);
                      }
                    }}
                  />
                }
                label="Is Target"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={hostInput.isAttacker}
                    disabled={!canChooseAttacker}
                    onChange={(e) => {
                      if (hostInput) {
                        let temp = clone(hostInput);
                        temp.isAttacker = e.target.checked ? true : false;
                        updateDraftHostPending(temp);
                        setCanChooseTarget(!canChooseTarget);
                      }
                    }}
                  />
                }
                label="Is Attacker"
              />
            </Box>
            <CollapseInputText
              property={NodeProperties.Vulnerbilities}
              data={hostInput}
              isCollapse
            />
            <CollapseInputText
              property={NodeProperties.networkServiceInfo}
              data={hostInput}
              isCollapse
            />
            <CollapseInputText
              property={NodeProperties.nfsMounted}
              data={hostInput}
              isCollapse
            />
            <CollapseInputText
              property={NodeProperties.nsfExportInfos}
              data={hostInput}
              isCollapse
            />
          </>
        ) : null}
      </Collapse>
    </List>
  );
}
