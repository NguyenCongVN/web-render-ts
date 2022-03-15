import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import { attackProcessActionCreators, hostActionCreators } from "../../redux";
import { SocketContext } from "../../context/socket";
import { RootState } from "../../redux/reducers/RootReducer";
import { StartAttackSuccessPayload } from "../../redux/payload-types/AttackProcessPayloadTypes";
import { SocketEvents } from "../../utils/enums/SocketEvents";

interface AlertProps {
  open: boolean;
  askScan?: boolean;
  connectedMap?: string;
  scanConfigFile?: string;
  topoContent?: string;
}

export default function AlertDialog({
  open,
  askScan,
  connectedMap,
  scanConfigFile,
  topoContent,
}: AlertProps) {
  const attackProcessState = useSelector(
    (state: RootState) => state.attackProcess
  );

  const dispatch = useDispatch();

  const { ToogleOpenAlert } = bindActionCreators(hostActionCreators, dispatch);
  const {
    toogleAskScan,
    startAttackPending,
  } = bindActionCreators(attackProcessActionCreators, dispatch);

  const handleClose = () => {
    console.log(open);
    if (askScan) {
      toogleAskScan();
    } else {
      ToogleOpenAlert();
    }
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
            {askScan
              ? "Chưa tồn tại thông tin dò quét? Bạn có muốn tiếp tục?"
              : "Hãy kiểm tra lại thông tin bạn đưa vào."}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {askScan ? (
            <>
              <Button
                onClick={() => {
                  handleClose();
                  console.log(connectedMap);
                  console.log(scanConfigFile);
                  console.log(topoContent);
                  if (connectedMap && scanConfigFile && topoContent) {
                    startAttackPending({
                      connectedMap: connectedMap,
                      scanConfigFile: scanConfigFile,
                      //@ts-ignore
                      scanReportId: attackProcessState.processes.map(
                        (process) => {
                          return {
                            hostLabel: process.hostLable,
                            reportId: process.scanReportId,
                          };
                        }
                      ),
                      topologyFile: topoContent,
                    });
                  }
                }}
                autoFocus
              >
                Tiếp tục
              </Button>
              <Button onClick={handleClose}>Hủy</Button>
            </>
          ) : (
            <Button onClick={handleClose} autoFocus>
              Chấp nhận
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
