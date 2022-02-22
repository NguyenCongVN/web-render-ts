import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { NodeProperties } from "../../utils/enums/NodeProperties";
import { useEffect, useState } from "react";
import { Vulnerbility } from "../../utils/classes/Vulnerbility";
import { Service } from "../../utils/classes/Service";
import Checkbox from "@mui/material/Checkbox";
import { FormControlLabel } from "@mui/material";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import { hostActionCreators } from "../../redux";
import { Host } from "../../utils/classes/Host";
interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  property: NodeProperties;
  data?: Service | Vulnerbility;
  host: Host;
}

export default function FormDialog({
  open,
  property,
  setOpen,
  data,
  host,
}: Props) {
  const dispatch = useDispatch();

  const { addVulnerbilityPending } = bindActionCreators(
    hostActionCreators,
    dispatch
  );

  const handleClose = () => {
    setOpen(false);
  };

  const [dataUpdate, setDataUpdate] = useState<Service[] | Vulnerbility[]>();

  // Set giá trị khởi tạo đối với từng property
  useEffect(() => {
    if (property === NodeProperties.Vulnerbilities) {
      if (data) {
        setDataUpdate([data as Vulnerbility]);
      } else {
        setDataUpdate([new Vulnerbility()]);
      }
    }
    if (property === NodeProperties.networkServiceInfo) {
      if (data) {
        setDataUpdate([data as Service]);
      } else {
        setDataUpdate([new Service()]);
      }
    }
  }, [data]);

  const renderInput = (property: NodeProperties) => {
    switch (property) {
      case NodeProperties.Vulnerbilities:
        return (
          <>
            <TextField
              autoFocus
              margin="dense"
              id="cve"
              label="CVE"
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) => {
                setDataUpdate((currentDataUpdate) => {
                  if (currentDataUpdate) {
                    if (property === NodeProperties.Vulnerbilities) {
                      if (dataUpdate && dataUpdate.length > 0) {
                        let temp = dataUpdate.slice()[0] as Vulnerbility;
                        temp.vulExist.cve = e.target.value;
                        return [temp];
                      }
                    }
                  }
                });
              }}
            />
            <TextField
              autoFocus
              margin="dense"
              id="typeExploit"
              label="Type Exploit"
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) => {
                setDataUpdate((currentDataUpdate) => {
                  if (currentDataUpdate) {
                    if (property === NodeProperties.Vulnerbilities) {
                      if (dataUpdate && dataUpdate.length > 0) {
                        let temp = dataUpdate.slice()[0] as Vulnerbility;
                        temp.vulProp.typeExploit = e.target.value;
                        return [temp];
                      }
                    }
                  }
                });
              }}
            />
            <TextField
              autoFocus
              margin="dense"
              id="Service"
              label="Service"
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) => {
                setDataUpdate((currentDataUpdate) => {
                  if (currentDataUpdate) {
                    if (property === NodeProperties.Vulnerbilities) {
                      if (dataUpdate && dataUpdate.length > 0) {
                        let temp = dataUpdate.slice()[0] as Vulnerbility;
                        temp.vulExist.service = e.target.value;
                        return [temp];
                      }
                    }
                  }
                });
              }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  defaultChecked
                  onChange={(e) => {
                    setDataUpdate((currentDataUpdate) => {
                      if (currentDataUpdate) {
                        if (property === NodeProperties.Vulnerbilities) {
                          if (dataUpdate && dataUpdate.length > 0) {
                            let temp = dataUpdate.slice()[0] as Vulnerbility;
                            temp.vulProp.isPrivEscalation =
                              e.target.value === "true" ? true : false;
                            return [temp];
                          }
                        }
                      }
                    });
                  }}
                />
              }
              label="Is Privileged Escalation"
            />
          </>
        );
      case NodeProperties.networkServiceInfo:
        return (
          <>
            <TextField
              autoFocus
              margin="dense"
              id="service"
              label="Service"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              id="protocol"
              label="Protocol"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              id="privilege"
              label="Privilege"
              type="text"
              fullWidth
              variant="standard"
            />
          </>
        );
      case NodeProperties.nfsMounted:
        return (
          <>
            <TextField
              autoFocus
              margin="dense"
              id="service"
              label="Service"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              id="protocol"
              label="Protocol"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              id="privilege"
              label="Privilege"
              type="text"
              fullWidth
              variant="standard"
            />
          </>
        );
      case NodeProperties.nsfExportInfos:
        return (
          <>
            <TextField
              autoFocus
              margin="dense"
              id="service"
              label="Service"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              id="protocol"
              label="Protocol"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              id="privilege"
              label="Privilege"
              type="text"
              fullWidth
              variant="standard"
            />
          </>
        );
      default:
        break;
    }
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Nhập dữ liệu</DialogTitle>
        <DialogContent>
          <DialogContentText>Nhập dữ liệu cho {property}</DialogContentText>
          {renderInput(property)}
        </DialogContent>
        <DialogActions>
          <Button sx={{ padding: "1rem" }} onClick={handleClose}>
            Hủy
          </Button>
          <Button
            sx={{ padding: "1rem" }}
            onClick={() => {
              if (dataUpdate) {
                if (property === NodeProperties.Vulnerbilities) {
                  if(dataUpdate.length > 0)
                  {
                    addVulnerbilityPending({
                      host: host,
                      vulnerbility: dataUpdate[0] as Vulnerbility,
                    });
                  }
                }
              }
              handleClose();
            }}
          >
            Thêm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
