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
} from "./utils/file_utils/ExportToTopologyFile";
import { RootState } from "./redux/reducers/RootReducer";
import { TypeAttack } from "./utils/enums/TypeAttacks";
import { SocketContext } from "./context/socket";
import { SocketEvents } from "./utils/enums/SocketEvents";
import {
  AddDetailPayload,
  ScanSuccessPayload,
  StartAttackSuccessPayload,
} from "./redux/payload-types/AttackProcessPayloadTypes";
import AlertModal from "./components/AlertModal/AlertModal";
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
          <Button
            sx={{ marginLeft: "5px" }}
            variant="contained"
            onClick={(e) => {
              saveDraftHosts();
            }}
          >
            Lưu lại
          </Button>
          <Button
            sx={{ marginLeft: "5px" }}
            variant="contained"
            onClick={(e) => {
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
                }
              }
            }}
          >
            Tấn công
          </Button>
          <Button
            sx={{ marginLeft: "5px" }}
            variant="contained"
            onClick={(e) => {
              saveDraftHosts();
            }}
          >
            Dừng
          </Button>
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
        ></AlertModal>
      </Stack>
    </Box>
  );
};

export default App;
