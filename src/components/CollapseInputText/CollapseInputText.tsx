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
import { useEffect, useState } from "react";
import { Host } from "../../utils/classes/Host";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import { hostActionCreators } from "../../redux";
import DeleteIcon from "@mui/icons-material/Delete";
import clone from "clone";

interface Props {
  data: Host;
  isCollapse?: boolean;
  property: NodeProperties;
}

const CollapseInputText = ({ property, isCollapse, data }: Props) => {
  const dispatch = useDispatch();

  const {
    updateDraftHostPending,
    removeVulnerbilityPending,
    removeServicePending,
    removeNfsMountedPending,
    removeNfsExportedPending,
  } = bindActionCreators(hostActionCreators, dispatch);

  const [open, setOpen] = useState(false);

  const [formOpen, setFormOpen] = useState(false);

  const [hostToUpdate, setHostToUpdate] = useState(data);

  useEffect(() => {
    if (data) {
      setHostToUpdate(data);
    }
  }, [data]);

  const handleClick = () => {
    setOpen(!open);
  };

  // CVE button render -> show to edit
  const renderData = (data: Host) => {
    if (property === NodeProperties.Vulnerbilities) {
      return data.Vulnerbilities.map((vulnerbility) => (
        <ListItemButton
          key={vulnerbility.id}
          id={vulnerbility.id}
          sx={{ pl: 4 }}
        >
          <ListItemText primary={vulnerbility.vulExist.cve} />
          <Tooltip title="Xóa">
            <IconButton
              onClick={(e) => {
                removeVulnerbilityPending({
                  host: hostToUpdate,
                  vulnerbility: vulnerbility,
                });
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </ListItemButton>
      ));
    }

    if (property === NodeProperties.networkServiceInfo) {
      return data.Services.map((service) => (
        <ListItemButton key={service.id} id={service.id} sx={{ pl: 4 }}>
          <ListItemText primary={service.service} />
          <Tooltip title="Xóa">
            <IconButton
              onClick={(e) => {
                removeServicePending({
                  host: hostToUpdate,
                  service: service,
                });
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </ListItemButton>
      ));
    }

    if (property === NodeProperties.nfsMounted) {
      return data.NSFMounted.map((nfs) => (
        <ListItemButton key={nfs.id} id={nfs.id} sx={{ pl: 4 }}>
          <ListItemText primary={nfs.fileServerPath} />
          <Tooltip title="Xóa">
            <IconButton
              onClick={(e) => {
                removeNfsMountedPending({
                  host: hostToUpdate,
                  nfsMounted: nfs,
                });
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </ListItemButton>
      ));
    }

    if (property === NodeProperties.nsfExportInfos) {
      return data.NSFExportInfo.map((nfs) => (
        <ListItemButton key={nfs.id} id={nfs.id} sx={{ pl: 4 }}>
          <ListItemText primary={nfs.path} />
          <Tooltip title="Xóa">
            <IconButton
              onClick={(e) => {
                removeNfsExportedPending({
                  host: hostToUpdate,
                  nfsExported: nfs,
                });
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
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
        host={hostToUpdate}
      />
    );
  };

  const renderText = () => {
    if (property) {
      if (property === NodeProperties.IP) {
        return hostToUpdate.IP;
      } else {
        return hostToUpdate.label.text;
      }
    } else {
      return "";
    }
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
            value={renderText()}
            id={property}
            onChange={(e) => {
              let temp = clone(hostToUpdate);
              if (property === NodeProperties.Label) {
                temp.label.text = e.target.value;
                setHostToUpdate(temp);
                updateDraftHostPending(temp);
              }

              if (property === NodeProperties.IP) {
                temp.IP = e.target.value;
                setHostToUpdate(temp);
                updateDraftHostPending(temp);
              }
            }}
          />
        </ListItemButton>
      </>
    );
  }
};

export default CollapseInputText;
