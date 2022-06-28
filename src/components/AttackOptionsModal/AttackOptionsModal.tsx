import {
  Button,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useState } from "react";
import { Host } from "../../utils/classes/Host";
import { NodeProperties } from "../../utils/enums/NodeProperties";
import CollapseInputText from "../CollapseInputText/CollapseInputText";

const AttackOptionsModal = (hostInput: Host) => {
  const [open, setopen] = useState(false);

  function handleClose(){
    if(open){
        setopen(false);
    }
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Tùy chọn tấn công"}</DialogTitle>
      <DialogContent>
        <Collapse in={open && hostInput != null} timeout="auto" unmountOnExit>
          {hostInput && !hostInput.IsRouter && !hostInput.IsSwitch ? (
            <>
              <CollapseInputText
                property={NodeProperties.AttackOptions}
                data={hostInput}
                isCollapse
              />
            </>
          ) : null}
        </Collapse>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} autoFocus>
          Chấp nhận
        </Button>
        <Button onClick={handleClose} autoFocus>
          Hủy tấn công
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AttackOptionsModal;
