import { Button } from "@mui/material";
import * as React from "react";
import { useRef } from "react";

type FileReaderProps = {
  setFileContent: Function;
  openNVDData?: boolean;
};

const FileSelector = ({ setFileContent, openNVDData }: FileReaderProps) => {
  const inputFile = useRef<HTMLDivElement | null>(
    null
  ) as React.MutableRefObject<HTMLInputElement>;

  function handleChange(selectorFiles: FileList) {
    var fr = new FileReader();
    fr.onload = () => {
      if (typeof fr.result == "string") {
        setFileContent(fr.result);
      }
    };
    fr.readAsText(selectorFiles[0]);
  }

  return (
    <div>
      <input
        type="file"
        ref={inputFile}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          if (e.target.files) {
            handleChange(e.target.files);
          }
        }}
        hidden
      />
      <Button
        variant="contained"
        onClick={() => {
          if (inputFile.current) {
            inputFile.current.click();
          }
        }}
      >
        {openNVDData ? "Cập nhật NVD" : "Mở File GNS3"}
      </Button>
    </div>
  );
};

export default FileSelector;
