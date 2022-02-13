import VisNetwork from "./components/VisNetwork/VisNetwork";
import ButtonAppBar from "./components/AppAppBar/AppAppBar";
import { Container, Stack } from "@mui/material";
import { Box } from "@mui/system";
import FileSelector from "./components/FileSelector/FileSelector";

import { ConvertGNS3 } from "./utils/file_utils/ConvertGNS3File";
import { Topology } from "./utils/classes/Topology";

import { useEffect, useState } from "react";
const App = () => {
  const [fileContent, setFileContent] = useState<string | null>(null);
  const [topology, setTopology] = useState<Topology | null>(null);

  useEffect(() => {
    if (fileContent) {
      setTopology(ConvertGNS3(fileContent));
    }
  }, [fileContent]);
  return (
    <Box>
      <ButtonAppBar />
      <Stack>
        <Container sx={{ p: "1rem" }}>
          <FileSelector setFileContent={setFileContent} />
        </Container>
        <VisNetwork topology={topology} />
      </Stack>
    </Box>
  );
};

export default App;
