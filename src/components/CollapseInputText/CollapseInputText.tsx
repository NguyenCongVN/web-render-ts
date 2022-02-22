import { IService } from "../../utils/interfaces/IService";
import { INfsExport } from "../../utils/interfaces/INfsExport";
import { INfsMounted } from "../../utils/interfaces/INfsMounted";
import { IVulnerbility } from "../../utils/interfaces/IVulnerability";
import * as React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { IconButton, TextField, Tooltip } from "@mui/material";
import { Add } from "@mui/icons-material";
import FormDialog from "../InputModal/FormDialog";
import { NodeProperties } from "../../utils/enums/NodeProperties";
import { Service } from "../../utils/classes/Service";
import { Vulnerbility } from "../../utils/classes/Vulnerbility";
import { dataRenderType } from "../../utils/classes/Topology";
import { useEffect, useState } from "react";
import { Host } from "../../utils/classes/Host";
import { useDispatch } from "react-redux";
import { updateDraftHostPending } from "../../redux/action-creators/Host.creators";
import { bindActionCreators } from "@reduxjs/toolkit";
import { hostActionCreators } from "../../redux";
import DeleteIcon from "@mui/icons-material/Delete";

interface Props {
  data: Host;
  isCollapse?: boolean;
  property: NodeProperties;
}

const CollapseInputText = ({ property, isCollapse, data }: Props) => {
  const dispatch = useDispatch();

  const { updateDraftHostPending } = bindActionCreators(
    hostActionCreators,
    dispatch
  );

  const [open, setOpen] = useState(true);

  const [formOpen, setFormOpen] = useState(false);

  const [hostToUpdate, setHostToUpdate] = useState([data]);

  useEffect(() => {
    if (data) {
      console.log(data);
      console.log(property);
      setHostToUpdate([data]);
    }
  }, [data]);

  const handleClick = () => {
    setOpen(!open);
  };

  // CVE button render -> show to edit
  const renderData = (data: Host) => {
    if (property === NodeProperties.Vulnerbilities) {
      return data.Vulnerbilities.map((vulnerbility) => (
        <ListItemButton sx={{ pl: 4 }}>
          <ListItemText primary={vulnerbility.vulExist.cve} />
          <Tooltip title="Delete">
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </ListItemButton>
      ));
    }

    if (property === NodeProperties.networkServiceInfo) {
      return data.Services.map((service) => (
        <ListItemButton sx={{ pl: 4 }}>
          <ListItemText primary={service.service} />
        </ListItemButton>
      ));
    }
  };

  // Form to add and edit
  const renderForm = () => {
    return (
      <FormDialog
        open={formOpen}
        setOpen={(open: boolean) => {
          setFormOpen(open);
        }}
        property={property} // use property to check type to render
        host={hostToUpdate[0]}
      />
    );
  };

  if (isCollapse) {
    return (
      <>
        <ListItemButton onClick={handleClick} sx={{ marginBottom: "2px" }}>
          <ListItemText primary={property} />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {renderData(data)}
            <ListItemButton
              sx={{ pl: 4 }}
              onClick={() => {
                setFormOpen(!formOpen);
              }}
            >
              <Add />
              <ListItemText primary="Thêm" />
            </ListItemButton>
          </List>
        </Collapse>
        {renderForm()}
      </>
    );
  } else {
    return (
      <>
        <ListItemButton sx={{ marginBottom: "2px" }}>
          <TextField
            label={property}
            variant="standard"
            margin="none"
            fullWidth
            value={
              property === NodeProperties.Label
                ? hostToUpdate[0].label.text
                : hostToUpdate[0].IP
            }
            id={property}
            onChange={(e) => {
              if (property === NodeProperties.Label) {
                setHostToUpdate((currentHost) => {
                  let temp = currentHost.slice();
                  temp[0].IP = "123";
                  console.log(temp[0] === currentHost[0]);
                  temp[0].label.text = e.target.value;
                  return temp;
                });
              }

              if (property === NodeProperties.IP) {
                setHostToUpdate((currentHost) => {
                  let temp = currentHost.slice();
                  temp[0].IP = e.target.value;
                  return temp;
                });
              }
              updateDraftHostPending(hostToUpdate[0]);
            }}
          />
        </ListItemButton>
      </>
    );
  }
};

export default CollapseInputText;
