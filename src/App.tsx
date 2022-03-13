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
import { saveAs } from "file-saver";
import {
  ExportToTopologyFile,
  ExportScanConfigFile,
  ExportToConnectedMap,
} from "./utils/file_utils/ExportToTopologyFile";
import { RootState } from "./redux/reducers/RootReducer";
import { TypeAttack } from "./utils/enums/TypeAttacks";
import { SocketContext } from "./context/socket";
// Socket io client
const App = () => {
  const socket = useContext(SocketContext);

  const [fileContent, setFileContent] = useState<string | null>(null);
  const [topology, setTopology] = useState<Topology | undefined>(undefined);
  const [typeAttack, setTypeAttack] = useState<TypeAttack>(
    TypeAttack.Logical_Attack
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

  const { startAttackPending } = bindActionCreators(
    attackProcessActionCreators,
    dispatch
  );

  useEffect(() => {
    // Socket event
    if (socket) {
      socket.io.on("open", () => {
        console.log("Connected to server");
      });
    }

    if (fileContent) {
      setTopology(ConvertGNS3(fileContent));
    }
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
          {/* <Button
            sx={{ marginLeft: "5px" }}
            variant="contained"
            onClick={(e) => {
              let scanConfigFile = ExportScanConfigFile(hostsState.hosts);

              if (scanConfigFile === null) {
                updateHostFailed();
              } else {
                var blob = new Blob([scanConfigFile], {
                  type: "text/plain;charset=utf-8",
                });

                saveAs(blob, "scan_config.csv");
                let topoContent = ExportToTopologyFile(
                  hostsState.hosts,
                  linksState.links,
                  typeAttack
                );
                blob = new Blob([topoContent], {
                  type: "text/plain;charset=utf-8",
                });
                saveAs(blob, "topology.P");

                let connectedDict = ExportToConnectedMap(
                  hostsState.hosts,
                  linksState.links
                );
                blob = new Blob([connectedDict], {
                  type: "text/plain;charset=utf-8",
                });
                saveAs(blob, "ConnectedDict.json");
              }
            }}
          >
            Xuất File
          </Button> */}
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
                let connectedDict = ExportToConnectedMap(
                  hostsState.hosts,
                  linksState.links
                );
                // Send data to server to save and run
                //  Check if reports are in redux store
                attackProcessState.processes.forEach((process) => {
                  if (process.scanReportId === undefined) {
                    return;
                  }
                });

                startAttackPending({
                  connectedMap: connectedDict,
                  scanConfigFile: scanConfigFile,
                  //@ts-ignore
                  scanReportId: attackProcessState.processes.map((process) => {
                    return {
                      hostLabel: process.hostLable,
                      reportId: process.scanReportId,
                    };
                  }),
                  topologyFile: topoContent,
                });
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
      </Stack>
    </Box>
  );
};

export default App;
