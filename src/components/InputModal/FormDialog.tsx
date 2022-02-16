import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Select from "../Select/Select";
import { NodeProperties } from "../../utils/enums/NodeProperties";
import { dataArrayUpdate } from "../CollapseInputText/CollapseInputText";
interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  properties: Record<string, string[]>[];
  property: NodeProperties;
}

type DetailProperties = keyof dataArrayUpdate;

export default function FormDialog({ open, property, setOpen }: Props) {
  const handleClose = () => {
    setOpen(false);
  };

  const renderInput = (
    properties: DetailProperties,
    property: NodeProperties
  ) => {
    if (property === NodeProperties.Vulnerbilities) {
      return (
        <>
          <Select />
          {properties}
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </>
      );
    }
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Nhập dữ liệu</DialogTitle>
        <DialogContent>
          <DialogContentText>Nhập dữ liệu cho {property}</DialogContentText>
          {renderInput( property)}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
