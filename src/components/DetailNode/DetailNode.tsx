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

import { NodeProperties } from "../../utils/enums/NodeProperties";
import { dataArrayUpdate, dataRenderType } from "../../utils/classes/Topology";
import CollapseInputText from "../CollapseInputText/CollapseInputText";
import { Host } from "../../utils/classes/Host";
import { Service } from "../../utils/classes/Service";
import { Vulnerbility } from "../../utils/classes/Vulnerbility";
import { NsfExport } from "../../utils/classes/NsfExport";
import { NfsMounted } from "../../utils/classes/NsfMounted";

interface NodeDetailProps {
  hostInput: Host | null | undefined;
  updateHost: (host: Host) => void;
}

export default function DetailNode({ hostInput, updateHost }: NodeDetailProps) {
  const [open, setOpen] = React.useState(true);

  // Lưu vào state
  const [host, setHost] = React.useState<Host | null | undefined>(hostInput);

  useEffect(() => {
    console.log("effect");
    setHost(hostInput);
  }, [hostInput]);

  // Update to state Function
  function UpdateLabel(label: string) {
    console.log("update label");
    setHost((currentHost) => {
      if (currentHost) {
        let temp = currentHost;
        temp.label.text = label;
        return temp;
      }
      return currentHost;
    });
  }

  function UpdateIP(ip: string) {
    setHost((currentHost) => {
      if (currentHost) {
        currentHost.IP = ip;
      }
      return currentHost;
    });
  }

  function AddVulnerbility(vulnerbilityToAdd: Vulnerbility) {
    if (host) {
      setHost((currentHost) => {
        if (currentHost) {
          currentHost.Vulnerbilities.push(vulnerbilityToAdd);
        }
        return currentHost;
      });
    }
  }

  function AddNsfExportInformation(nsfInformation: NsfExport) {
    if (host) {
      setHost((currentHost) => {
        if (currentHost) {
          currentHost.NSFExportInfo.push(nsfInformation);
        }
        return currentHost;
      });
    }
  }

  function AddNetworkService(networkService: Service) {
    if (host) {
      setHost((currentHost) => {
        if (currentHost) {
          currentHost.Services.push(networkService);
        }
        return currentHost;
      });
    }
  }

  function AddNfsMounted(nfsMounted: NfsMounted) {
    if (host) {
      setHost((currentHost) => {
        if (currentHost) {
          currentHost.NSFMounted.push(nfsMounted);
        }
        return currentHost;
      });
    }
  }

  function RemoveVulnerbility(vulnerbilityToRemove: Vulnerbility) {
    if (host) {
      setHost((currentHost) => {
        if (currentHost) {
          currentHost.Vulnerbilities.filter((vulnerbility) => {
            return vulnerbilityToRemove.id === vulnerbility.id;
          });
        }
        return currentHost;
      });
    }
  }

  function RemoveNsfExportInformation(nsfInformationToRemove: INfsExport) {
    if (host) {
      setHost((currentHost) => {
        if (currentHost) {
          currentHost.Vulnerbilities.filter((nsfInformation) => {
            return nsfInformationToRemove.id === nsfInformation.id;
          });
        }
        return currentHost;
      });
    }
  }

  function RemoveNetworkService(networkServiceToRemove: IService) {
    if (host) {
      setHost((currentHost) => {
        if (currentHost) {
          currentHost.Services.filter((service) => {
            return networkServiceToRemove.id === service.id;
          });
        }
        return currentHost;
      });
    }
  }

  function RemoveNfsMounted(nfsMountedToRemove: INfsMounted) {
    if (host) {
      setHost((currentHost) => {
        if (currentHost) {
          currentHost.Services.filter((nfsMounted) => {
            return nfsMountedToRemove.id === nfsMounted.id;
          });
        }
        return currentHost;
      });
    }
  }

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
          data={host ? host.label.text : ""}
          onChangeHandle={(label: dataRenderType) => {
            if (typeof label == "string") {
              console.log(host);
              console.log("Detail Node");
              UpdateLabel(label);
            }
          }}
        />
        <CollapseInputText
          property={NodeProperties.IP}
          data={host ? host.IP : ""}
          onChangeHandle={(ip: dataRenderType) => {
            if (typeof ip == "string") {
              UpdateIP(ip);
            }
          }}
        />
        <CollapseInputText
          property={NodeProperties.Vulnerbilities}
          data={host ? host.Vulnerbilities : []}
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
