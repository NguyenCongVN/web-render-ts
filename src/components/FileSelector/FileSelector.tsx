import * as React from "react";

type FileReaderProps = {
  setFileContent: Function;
};

const FileSelector = ({ setFileContent }: FileReaderProps) => {
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
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          if (e.target.files) {
            handleChange(e.target.files);
          }
        }}
      />
    </div>
  );
};

export default FileSelector;
