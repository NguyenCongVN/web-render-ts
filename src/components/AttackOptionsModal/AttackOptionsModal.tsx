import {
  Button,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { bindActionCreators } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { attackProcessActionCreators } from "../../redux";
import { RootState } from "../../redux/reducers/RootReducer";
import { Host } from "../../utils/classes/Host";
import { NodeProperties } from "../../utils/enums/NodeProperties";
import CollapseInputText from "../CollapseInputText/CollapseInputText";

interface AttackOptionModalProps {
  hostInput: Host | undefined;
}

const AttackOptionsModal = ({ hostInput }: AttackOptionModalProps) => {
  const attackProcessState = useSelector(
    (state: RootState) => state.attackProcess
  );

  const dispatch = useDispatch();

  const { toogleAddAttackOptions } = bindActionCreators(
    attackProcessActionCreators,
    dispatch
  );

  return (
    <Dialog
      open={attackProcessState.askAddAttackOptions}
      onClose={toogleAddAttackOptions}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Tùy chọn tấn công"}</DialogTitle>
      <DialogContent>
        <Collapse
          in={attackProcessState.askAddAttackOptions && hostInput != null}
          timeout="auto"
          unmountOnExit
        >
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
        <Button
          onClick={() => {
            toogleAddAttackOptions({ isInital: false });
          }}
          autoFocus
        >
          Chấp nhận
        </Button>
        <Button
          onClick={() => {
            toogleAddAttackOptions({ isInital: false });
          }}
          autoFocus
        >
          Hủy tấn công
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AttackOptionsModal;
