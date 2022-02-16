import { IService } from "../../utils/interfaces/IService";
import { INfsExport } from "../../utils/interfaces/INfsExport";
import { INfsMounted } from "../../utils/interfaces/INfsMounted";
import { IVulnerbility } from "../../utils/interfaces/IVulnerability";
import * as React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { TextField } from "@mui/material";
import { Add } from "@mui/icons-material";
import FormDialog from "../InputModal/FormDialog";

export type dataRenderType =
  | IService[]
  | INfsExport[]
  | INfsMounted[]
  | IVulnerbility[]
  | string;

export type dataArrayUpdate =
  | IService
  | INfsExport
  | INfsMounted
  | IVulnerbility;

interface Props {
  data: dataRenderType;
  isCollapse?: boolean;
  property: string;
  onChangeHandle?: (data: string) => void;
  onAddHandle?: (
    data: IService | INfsExport | INfsMounted | IVulnerbility
  ) => void;
  onRemoveHandle?: (
    data: IService | INfsExport | INfsMounted | IVulnerbility
  ) => void;
}

const CollapseInputText = ({
  property,
  isCollapse,
  data,
  onChangeHandle,
}: Props) => {
  const [open, setOpen] = React.useState(true);

  const [formOpen, setFormOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const renderData = (data: dataArrayUpdate) => {
    if (data.type === "IVulnerbility") {
      return (
        <ListItemButton sx={{ pl: 4 }}>
          <ListItemText primary={data.vulExist.cve} />
        </ListItemButton>
      );
    }
  };

  if (isCollapse) {
    return (
      <>
        <ListItemButton onClick={handleClick} sx={{ marginBottom: "2px" }}>
          <ListItemText primary={property} />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {typeof data !== "string" &&
              data.map((object) => {
                return renderData(object);
              })}
            <ListItemButton
              sx={{ pl: 4 }}
              onClick={() => {
                setFormOpen(!formOpen);
                console.log(formOpen);
              }}
            >
              <Add />
              <ListItemText primary="Thêm" />
            </ListItemButton>
          </List>
        </Collapse>
        {typeof data !== "string" && (
          <FormDialog
            open={formOpen}
            setOpen={(open: boolean) => {
              setFormOpen(open);
              console.log(formOpen);
            }}
            properties={[{ as: ["as21"] }]}
            dataType={data[0]}
          />
        )}
      </>
    );
  }
  return (
    <>
      <ListItemButton sx={{ marginBottom: "2px" }}>
        <TextField
          label={property}
          variant="standard"
          margin="none"
          fullWidth
          value={data}
          id={property}
          onChange={(e) => {
            if (onChangeHandle) {
              onChangeHandle(e.target.value);
            }
          }}
        />
      </ListItemButton>
    </>
  );
};

export default CollapseInputText;
