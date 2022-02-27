import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import Collapse from "@mui/material/Collapse";
import { Box, Button, TextField } from "@mui/material";

import { IHost } from "../../utils/interfaces/IHost";
import { useEffect } from "react";

import { IVulnerbility } from "../../utils/interfaces/IVulnerability";
import { IService } from "../../utils/interfaces/IService";
import { INfsExport } from "../../utils/interfaces/INfsExport";
import { INfsMounted } from "../../utils/interfaces/INfsMounted";

import { NodeProperties } from "../../utils/enums/NodeProperties";
import { dataRenderType } from "../../utils/classes/Topology";
import CollapseInputText from "../CollapseInputText/CollapseInputText";
import { Host } from "../../utils/classes/Host";
import { Service } from "../../utils/classes/Service";
import { Vulnerbility } from "../../utils/classes/Vulnerbility";
import { NsfExport } from "../../utils/classes/NsfExport";
import { NfsMounted } from "../../utils/classes/NsfMounted";
import { useDispatch } from "react-redux";

interface NodeDetailProps {
  hostInput: Host | undefined;
}

export default function DetailNode({ hostInput }: NodeDetailProps) {
  // redux action

  const dispatch = useDispatch();

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
        {hostInput && !hostInput.IsRouter() && !hostInput.IsSwitch() ? (
          <>
            <CollapseInputText
              property={NodeProperties.Label}
              data={hostInput}
            />
            <CollapseInputText property={NodeProperties.IP} data={hostInput} />
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
