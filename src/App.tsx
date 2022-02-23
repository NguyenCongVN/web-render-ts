import VisNetwork from "./components/VisNetwork/VisNetwork";
import ButtonAppBar from "./components/AppAppBar/AppAppBar";
import { Button, Container, Stack } from "@mui/material";
import { Box } from "@mui/system";
import FileSelector from "./components/FileSelector/FileSelector";

import { ConvertGNS3 } from "./utils/file_utils/ConvertGNS3File";
import { Topology } from "./utils/classes/Topology";

import { useEffect, useState } from "react";
import { bindActionCreators } from "@reduxjs/toolkit";
import { hostActionCreators, store } from "./redux";
import { useDispatch, useSelector } from "react-redux";
import { saveAs } from "file-saver";
import { ExportToTopologyFile } from "./utils/file_utils/ExportToTopologyFile";
import { RootState } from "./redux/reducers/RootReducer";

const App = () => {
  const [fileContent, setFileContent] = useState<string | null>(null);
  const [topology, setTopology] = useState<Topology | undefined>(undefined);

  const hostsState = useSelector((state: RootState) => state.hosts);
  const linksState = useSelector((state: RootState) => state.links);

  const dispatch = useDispatch();

  const { saveDraftHosts } = bindActionCreators(hostActionCreators, dispatch);

  useEffect(() => {
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
          <Button
            sx={{ marginLeft: "5px" }}
            variant="contained"
            onClick={(e) => {
              let topoContent = ExportToTopologyFile(
                hostsState.hosts,
                linksState.links
              );
              var blob = new Blob([topoContent], {
                type: "text/plain;charset=utf-8",
              });
              saveAs(blob, "example.D");
            }}
          >
            Xuất File
          </Button>
        </Container>
        <VisNetwork topologyInput={topology} />
      </Stack>
    </Box>
  );
};

export default App;
