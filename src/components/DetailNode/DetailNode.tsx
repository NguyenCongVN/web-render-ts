import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import Collapse from "@mui/material/Collapse";
import { Box, Button, TextField } from "@mui/material";

import { IHost } from "../../utils/interfaces/IHost";
import { useEffect } from "react";

import { IVulnerbility } from "../../utils/interfaces/IVulnerability";
import { IService } from "../../utils/interfaces/IService";
import { INfsExport } from "../../utils/interfaces/INfsExport";
import { INfsMounted } from "../../utils/interfaces/INfsMounted";
import CollapseInputText, {
  dataArrayUpdate,
  dataRenderType,
} from "../CollapseInputText/CollapseInputText";

import { NodeProperties } from "../../utils/enums/NodeProperties";

interface NodeDetailProps {
  host: IHost | null | undefined;
  updateHost: (host: IHost) => void;
}

export default function DetailNode({ host, updateHost }: NodeDetailProps) {
  const [open, setOpen] = React.useState(true);
  const [label, setLabel] = React.useState("");
  const [ip, setIP] = React.useState("");
  const [vulnerbilities, setVulnerbilities] = React.useState<IVulnerbility[]>(
    []
  );
  const [nsfExportInfo, setNsfExportInfo] = React.useState<INfsExport[]>([]);
  const [networkServices, setNetworkServices] = React.useState<IService[]>([]);

  const [nfsMounts, setNfsMounts] = React.useState<INfsMounted[]>([]);

  // Update to state Function
  function UpdateLabel(label: string) {
    setLabel(label);
  }

  function UpdateIP(ip: string) {
    setIP(ip);
  }

  function AddVulnerbility(vulnerbility: IVulnerbility) {
    setVulnerbilities([...vulnerbilities, vulnerbility]);
  }

  function AddNsfExportInformation(nsfInformation: INfsExport) {
    setNsfExportInfo([...nsfExportInfo, nsfInformation]);
  }

  function AddNetworkService(networkService: IService) {
    setNetworkServices([...networkServices, networkService]);
  }

  function AddNfsMounted(nfsMounted: INfsMounted) {
    setNfsMounts([...nfsMounts, nfsMounted]);
  }

  function RemoveVulnerbility(vulnerbilityToRemove: IVulnerbility) {
    vulnerbilities.filter((vulnerbility) => {
      return vulnerbilityToRemove.id === vulnerbility.id;
    });
  }

  function RemoveNsfExportInformation(nsfInformationToRemove: INfsExport) {
    nsfExportInfo.filter((nsfInformation) => {
      return nsfInformationToRemove.id === nsfInformation.id;
    });
  }

  function RemoveNetworkService(networkServiceToRemove: IService) {
    networkServices.filter((service) => {
      return networkServiceToRemove.id === service.id;
    });
  }

  function RemoveNfsMounted(nfsMountedToRemove: INfsMounted) {
    nfsMounts.filter((nfsMounted) => {
      return nfsMountedToRemove.id === nfsMounted.id;
    });
  }

  useEffect(() => {
    console.log(host);
    if (host) {
      setLabel(host.label.text);

      if (host.IP) {
        setIP(host.IP);
      } else {
        setIP("");
      }

      if (host.Vulnerbilities) {
        setVulnerbilities(host.Vulnerbilities);
      } else {
        setVulnerbilities([]);
      }

      if (host.NSFExportInfo) {
        setNsfExportInfo(host.NSFExportInfo);
      } else {
        setNsfExportInfo([]);
      }

      if (host.NSFMounted) {
        setNfsMounts(host.NSFMounted);
      } else {
        setNfsMounts([]);
      }
    } else {
      setLabel("");
      setIP("");
      setVulnerbilities([]);
      setNsfExportInfo([]);
      setNfsMounts([]);
      setNetworkServices([]);
    }
  }, [host]);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      sx={{
        width: "100%",
        maxHeight: 500,
        bgcolor: "grey.A100",
        overflow: "auto",
        borderRadius: "10px",
      }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader
          component="div"
          id="nested-list-subheader"
          sx={{ bgcolor: "grey.A100", display: "flex" }}
        >
          Thuộc tính
          <Button
            sx={{ margin: "auto 0 auto auto", height: "70%" }}
            size="small"
            variant="outlined"
            onClick={() => {
              handleClick();
            }}
          >
            {host ? (open ? "Thu lại" : "Mở rộng") : "Hãy chọn host"}
          </Button>
        </ListSubheader>
      }
    >
      <Collapse in={open} timeout="auto" unmountOnExit>
        <CollapseInputText
          property={NodeProperties.Label}
          data={label}
          onChangeHandle={(label: dataRenderType) => {
            if (typeof label == "string") {
              UpdateLabel(label);
            }
          }}
        />
        <CollapseInputText
          property={NodeProperties.IP}
          data={ip}
          onChangeHandle={(ip: dataRenderType) => {
            if (typeof ip == "string") {
              UpdateIP(ip);
            }
          }}
        />

        <CollapseInputText
          property={NodeProperties.Vulnerbilities}
          data={vulnerbilities}
          onAddHandle={(vulnerbility: dataArrayUpdate) => {
            if (vulnerbility.type === "IVulnerbility")
              AddVulnerbility(vulnerbility);
          }}
          onRemoveHandle={(vulnerbility: dataArrayUpdate) => {
            if (vulnerbility.type === "IVulnerbility") {
              RemoveVulnerbility(vulnerbility);
            }
          }}
          isCollapse
        />

        {host ? (
          <Box sx={{ display: "flex", justifyContent: "end" }}>
            <Button
              variant="contained"
              sx={{
                marginRight: "20px",
                marginTop: "20px",
                alignSelf: "flex-end",
                padding: "10px",
              }}
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              Lưu lại
            </Button>
          </Box>
        ) : null}
      </Collapse>
    </List>
  );
}
