import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import { hostActionCreators } from "../../redux";

interface AlertProps {
  open: boolean;
}

export default function AlertDialog({ open }: AlertProps) {
  const dispatch = useDispatch();

  const { ToogleOpenAlert } = bindActionCreators(hostActionCreators, dispatch);

  const handleClose = () => {
    console.log(open);
    ToogleOpenAlert();
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Lưu thất bại!"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Hãy kiểm tra lại thông tin bạn đưa vào.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Chấp nhận
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
