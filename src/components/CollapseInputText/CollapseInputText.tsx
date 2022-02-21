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
import { NodeProperties } from "../../utils/enums/NodeProperties";
import { Service } from "../../utils/classes/Service";
import { Vulnerbility } from "../../utils/classes/Vulnerbility";
import { dataArrayUpdate, dataRenderType } from "../../utils/classes/Topology";
import { useEffect, useState } from "react";

interface Props {
  data: dataRenderType;
  isCollapse?: boolean;
  property: NodeProperties;
  onChangeHandle?: (data: string) => void; // for handle change with ip and label
  // for handle add and remove Vulnerbilities
  onAddHandle?: (data: dataArrayUpdate) => void;
  onRemoveHandle?: (data: dataArrayUpdate) => void;
}

const CollapseInputText = ({
  property,
  isCollapse,
  data,
  onChangeHandle,
  onAddHandle,
  onRemoveHandle,
}: Props) => {
  const [open, setOpen] = useState(true);

  const [formOpen, setFormOpen] = useState(false);

  const [dataUpdate, setDateUpdate] = useState(data);

  useEffect(() => {
    if (data) {
      setDateUpdate(data);
    }
  }, [data]);

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

  const renderForm = (nodeType: NodeProperties) => {
    if (nodeType === NodeProperties.Vulnerbilities) {
      return (
        <FormDialog
          open={formOpen}
          setOpen={(open: boolean) => {
            setFormOpen(open);
            console.log(formOpen);
          }}
          property={property}
          handleSave={(data: dataArrayUpdate) => {
            if (onAddHandle) {
              onAddHandle(data);
            }
          }}
        />
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
            {/* {typeof data !== "string" &&
              data.map((object) => {
                return renderData(object);
              })} */}
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
        {renderForm(property)}
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
          value={dataUpdate}
          id={property}
          onChange={(e) => {
            console.log(dataUpdate);
            setDateUpdate(e.target.value);
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
