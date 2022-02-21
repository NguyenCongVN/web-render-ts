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
interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  property: NodeProperties;
  handleSave: (dataUpdate: Vulnerbility | Service) => void;
}

export default function FormDialog({
  open,
  property,
  setOpen,
  handleSave,
}: Props) {
  const handleClose = () => {
    setOpen(false);
  };

  const [dataUpdate, setDataUpdate] = useState<Vulnerbility | Service>();

  // Set giá trị khởi tạo đối với từng property
  useEffect(() => {
    if (property === NodeProperties.Vulnerbilities) {
      setDataUpdate(new Vulnerbility());
    }

    if (property === NodeProperties.networkServiceInfo) {
      setDataUpdate(new Service());
    }
  }, []);

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
                let temp = dataUpdate as Vulnerbility;
                temp.vulExist.cve = e.target.value;
                setDataUpdate(temp);
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
                let temp = dataUpdate as Vulnerbility;
                temp.vulProp.typeExploit = e.target.value;
                setDataUpdate(temp);
              }}
            />
            <TextField
              autoFocus
              margin="dense"
              id="isPrivEscalation"
              label="Service"
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) => {
                let temp = dataUpdate as Vulnerbility;
                temp.vulExist.service = e.target.value;
                setDataUpdate(temp);
              }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  defaultChecked
                  onChange={(e) => {
                    let temp = dataUpdate as Vulnerbility;
                    temp.vulProp.isPrivEscalation =
                      !temp.vulProp.isPrivEscalation;
                    setDataUpdate(temp);
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
                handleSave(dataUpdate);
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
