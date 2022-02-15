import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import Collapse from "@mui/material/Collapse";
import { Box, Button, TextField } from "@mui/material";

import { IHost } from "../../utils/interfaces/IHost";
import { useEffect } from "react";

interface NodeDetailProps {
  host: IHost | null | undefined;
  updateHost: (host: IHost) => void;
}

export default function DetailNode({ host, updateHost }: NodeDetailProps) {
  const [open, setOpen] = React.useState(true);
  const [label, setLabel] = React.useState("");
  const [ip, setIP] = React.useState("");
  const [cve, setCve] = React.useState<string | null>(null);
  const [nsf, setNsf] = React.useState<string | null>(null);

  useEffect(() => {
    console.log(host);
    if (host) {
      setLabel(host.label.text);
      if (host.IP) {
        setIP(host.IP);
      } else {
        setIP("");
      }
      if (host.CVE && host.CVE.length > 0) {
        let cveString = "";
        host.CVE.forEach((cve) => {
          cveString = cve + ";" + cveString;
        });
        setCve(cveString);
      } else {
        setCve("");
      }

      if (host.NSF && host.NSF.length > 0) {
        let nfsString = "";
        host.NSF.forEach((nfs) => {
          nfsString = nfs + ";" + nfsString;
        });
        setNsf(nfsString);
      } else {
        setNsf("");
      }
    } else {
      setLabel("");
      setIP("");
      setCve("");
      setNsf("");
    }
  }, [host]);

  const propertiesList = ["Label", "IP Address", "CVE", "NSF"];

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
        {host
          ? propertiesList.map((property, index) => {
              let value = "";
              switch (property) {
                case "Label":
                  value = label;
                  break;
                case "IP Address":
                  value = ip;
                  break;
                case "CVE":
                  if (cve) {
                    value = cve;
                  }
                  break;
                case "NSF":
                  if (nsf) {
                    value = nsf;
                  }
                  break;
                default:
                  break;
              }
              return (
                <ListItemButton key={index.toString()}>
                  <TextField
                    label={property}
                    variant="standard"
                    margin="none"
                    fullWidth
                    value={value}
                    id={property}
                    onChange={(e) => {
                      switch (e.target.id) {
                        case "Label":
                          setLabel(e.target.value);
                          break;
                        case "IP Address":
                          setIP(e.target.value);
                          break;
                        case "CVE":
                          setCve(e.target.value);
                          break;
                        case "NSF":
                          setNsf(e.target.value);
                          break;
                        default:
                          break;
                      }
                    }}
                  />
                </ListItemButton>
              );
            })
          : null}
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
                if (host) {
                  host.CVE = [];
                  // Xử lý chuỗi CVE và NSF (CVE dạng number;number)
                  if (cve && cve.length > 0) {
                    cve.split(";").forEach((cve) => {
                      if (cve !== "") {
                        host.CVE.push(cve);
                      }
                    });
                  }

                  host.NSF = [];
                  if (nsf && nsf.length > 0) {
                    nsf?.split(";").forEach((nsf) => {
                      host.NSF.push(nsf);
                    });
                  }

                  // Lưu lại thông tin vào prop

                  if (label) {
                    host.label.text = label;
                  }
                  if (ip) {
                    host.IP = ip;
                  }
                  updateHost(host);
                }
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
