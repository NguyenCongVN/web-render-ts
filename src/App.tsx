import VisNetwork from "./components/VisNetwork/VisNetwork";
import ButtonAppBar from "./components/AppAppBar/AppAppBar";
import { Button, Container, Stack, Switch, Typography } from "@mui/material";
import { Box } from "@mui/system";
import FileSelector from "./components/FileSelector/FileSelector";

import { ConvertGNS3 } from "./utils/file_utils/ConvertGNS3File";
import { Topology } from "./utils/classes/Topology";

import { useContext, useEffect, useState } from "react";
import { bindActionCreators } from "@reduxjs/toolkit";
import { hostActionCreators } from "./redux";
import { attackProcessActionCreators } from "./redux";
import { useDispatch, useSelector } from "react-redux";
import {
  ExportToTopologyFile,
  ExportScanConfigFile,
  ExportToConnectedMap,
  ExportToReachableMap,
} from "./utils/file_utils/ExportToTopologyFile";
import { RootState } from "./redux/reducers/RootReducer";
import { TypeAttack } from "./utils/enums/TypeAttacks";
import { SocketContext } from "./context/socket";
import { SocketEvents } from "./utils/enums/SocketEvents";
import {
  AddDetailPayload,
  AttackStateChangePayload,
  GotMeterpreterPayload,
  GotShellPayload,
  ScanSuccessPayload,
  TrainingSuccessPayload,
} from "./redux/payload-types/AttackProcessPayloadTypes";
import AlertModal from "./components/AlertModal/AlertModal";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SaveIcon from "@mui/icons-material/Save";
import CommandInteractDialog from "./components/CommandInteractDialog/CommandInteractDialog";
import { ConvertNVDData } from "./utils/file_utils/ConvertNVDData";
// Socket io client
const App = () => {
  const socket = useContext(SocketContext);

  const [fileContent, setFileContent] = useState<string | null>(null);
  const [topology, setTopology] = useState<Topology | undefined>(undefined);
  const [typeAttack, setTypeAttack] = useState<TypeAttack>(
    TypeAttack.Logical_Attack
  );

  // Start attack
  const [configScanFile, setConfigScanFile] = useState<string | undefined>(
    undefined
  );
  const [topologyFile, setTopologyFile] = useState<string | undefined>(
    undefined
  );
  const [connectedMap, setConnectedMap] = useState<string | undefined>(
    undefined
  );
  const [reachableMap, setReachableMap] = useState<string | undefined>(
    undefined
  );

  const hostsState = useSelector((state: RootState) => state.hosts);
  const linksState = useSelector((state: RootState) => state.links);
  const attackProcessState = useSelector(
    (state: RootState) => state.attackProcess
  );

  const dispatch = useDispatch();

  const { saveDraftHosts, updateHostFailed } = bindActionCreators(
    hostActionCreators,
    dispatch
  );

  const {
    startAttackPending,
    toogleAskScan,
    addDetailProcess,
    startScaning,
    scanSuccess,
    scanFailed,
    scanSuccessAll,
    trainSuccess,
    startTraining,
    trainFailed,
    attacking,
    attackFailed,
    attackStateChanged,
    attackSuccess,
    gotShell,
    gotMeterpreter,
  } = bindActionCreators(attackProcessActionCreators, dispatch);

  useEffect(() => {
    if (fileContent) {
      setTopology(ConvertGNS3(fileContent));
    }
    socket?.on(SocketEvents.ADD_DETAIL, (detail: AddDetailPayload) => {
      console.log("add detail");
      addDetailProcess(detail);
    });

    socket?.on(SocketEvents.SCANING, () => {
      console.log("Scanning");
      startScaning();
    });

    socket?.on(SocketEvents.SCAN_SUCCESS, (payload: ScanSuccessPayload) => {
      console.log("Scan sucessfully");
      scanSuccess(payload);
    });

    socket?.on(SocketEvents.SCAN_SUCCESS_ALL, () => {
      console.log("Scan sucessfully all");
      scanSuccessAll();
    });

    socket?.on(SocketEvents.TRAINING, () => {
      console.log("startTraining");
      startTraining();
    });

    socket?.on(
      SocketEvents.TRAINING_SUCCESS,
      (payload: TrainingSuccessPayload) => {
        console.log("Train success");
        trainSuccess(payload);
      }
    );

    socket?.on(SocketEvents.TRAINING_FAILED, () => {
      console.log("Train failed");
      trainFailed();
    });

    socket?.on(SocketEvents.ATTACKING, () => {
      console.log("Attacking");
      attacking();
    });

    socket?.on(SocketEvents.ATTACKING_SUCCESS, () => {
      console.log("Attack Success");
      attackSuccess();
    });

    socket?.on(SocketEvents.ATTACK_FAILED, () => {
      console.log("Attack Failed");
      attackFailed();
    });

    socket?.on(
      SocketEvents.ATTACK_STATE_CHANGE,
      (payload: AttackStateChangePayload) => {
        console.log("Attack State Changed");
        attackStateChanged(payload);
      }
    );

    socket?.on(SocketEvents.GOT_SHELL, (payload: GotShellPayload) => {
      console.log("Got Shell");
      gotShell(payload);
    });

    socket?.on(
      SocketEvents.GOT_METERPRETER,
      (payload: GotMeterpreterPayload) => {
        console.log("Got Meterpreter");
        gotMeterpreter(payload);
      }
    );
  }, [fileContent]);

  return (
    <Box>
      <ButtonAppBar />
      <Stack>
        <Container
          sx={{
            p: "1rem",
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
          }}
        >
          <FileSelector setFileContent={setFileContent} />
          <FileSelector
            openNVDData
            setFileContent={(nvdFileContent: string) => {
              ConvertNVDData(nvdFileContent);
            }}
          />
          <Button
            sx={{ marginLeft: "5px" }}
            variant="contained"
            onClick={(e) => {
              saveDraftHosts();
            }}
          >
            <Typography variant="body2" marginRight="10px">
              Lưu lại
            </Typography>
            <SaveIcon />
          </Button>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              disabled={
                attackProcessState.isAttacking || attackProcessState.isScanning
              }
              sx={{ marginLeft: "5px" }}
              variant="contained"
              onClick={(e) => {
                let reachableMap = ExportToReachableMap(
                  hostsState.hosts,
                  linksState.links
                );

                let scanConfigFile = ExportScanConfigFile(hostsState.hosts);
                if (scanConfigFile === null) {
                  updateHostFailed();
                } else {
                  let topoContent = ExportToTopologyFile(
                    hostsState.hosts,
                    linksState.links,
                    typeAttack
                  );
                  let connectedMap = ExportToConnectedMap(
                    hostsState.hosts,
                    linksState.links
                  );

                  let checkAllContainReport = true;
                  // Send data to server to save and run
                  //  Check if reports are in redux store
                  if (attackProcessState.processes.length > 0) {
                    attackProcessState.processes.forEach((process) => {
                      if (process.scanReportId === undefined) {
                        console.log("No Scan report");
                        checkAllContainReport = false;
                      }
                    });
                  } else {
                    console.log("No Scan report");
                    checkAllContainReport = false;
                  }

                  if (checkAllContainReport) {
                    startAttackPending({
                      connectedMap: connectedMap,
                      scanConfigFile: scanConfigFile,
                      reachableMap: reachableMap,
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
                  } else {
                    toogleAskScan();
                    setTopologyFile(topoContent);
                    setConfigScanFile(scanConfigFile);
                    setConnectedMap(connectedMap);
                    setReachableMap(reachableMap);
                  }
                }
              }}
            >
              <Typography variant="body2" marginRight="10px">
                Tấn công
              </Typography>
              <PlayArrowIcon />
            </Button>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              sx={{ marginLeft: "5px" }}
              variant="contained"
              onClick={(e) => {}}
              disabled={
                !attackProcessState.isScanning &&
                !attackProcessState.isAttacking
              }
            >
              <Typography variant="body2" marginRight="10px">
                Dừng
              </Typography>
              <StopCircleIcon />
            </Button>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              marginLeft: "auto",
            }}
          >
            <Typography variant="body2" component="p">
              Real Attack
            </Typography>
            <Switch
              checked={typeAttack === TypeAttack.Logical_Attack}
              onChange={(e) => {
                if (typeAttack === TypeAttack.Logical_Attack) {
                  setTypeAttack(TypeAttack.Real_Attack);
                } else {
                  setTypeAttack(TypeAttack.Logical_Attack);
                }
              }}
            />
            <Typography variant="body2" component="p">
              Logical Attack
            </Typography>
          </Box>
        </Container>
        <VisNetwork topologyInput={topology} />
        <AlertModal
          askScan
          open={attackProcessState.askScanOpen}
          connectedMap={connectedMap}
          scanConfigFile={configScanFile}
          topoContent={topologyFile}
          reachableMap={reachableMap}
        ></AlertModal>
      </Stack>
      <CommandInteractDialog />
    </Box>
  );
};

export default App;
