import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TabCommand from "../TabCommand/TabCommand";
import { RootState } from "../../redux/reducers/RootReducer";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import { attackProcessActionCreators } from "../../redux";
import { TextField } from "@mui/material";

export default function MaxWidthDialog() {
  const attackState = useSelector(
    (rootState: RootState) => rootState.attackProcess
  );

  const dispatch = useDispatch();
  const { closeCommand } = bindActionCreators(
    attackProcessActionCreators,
    dispatch
  );

  const handleClose = () => {
    closeCommand();
  };

  return (
    <React.Fragment>
      <Dialog
        fullWidth
        maxWidth="lg"
        open={attackState.openComand}
        onClose={handleClose}
      >
        <DialogTitle>Command Manager</DialogTitle>
        <DialogContent sx={{ height: "60vh", display: "flex" }}>
          <TabCommand />
        </DialogContent>
        <DialogActions
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TextField
            sx={{
              display: "flex",
              flex: 1,
              marginLeft: "20px",
              marginBottom: "10px",
            }}
            label=">command"
            variant="standard"
          />
          <Button onClick={handleClose}>Đóng</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
