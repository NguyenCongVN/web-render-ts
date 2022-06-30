import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { NodeProperties } from "../../utils/enums/NodeProperties";
import { useEffect, useState } from "react";
import { Vulnerbility } from "../../utils/classes/Vulnerbility";
import { Service } from "../../utils/classes/Service";
import Checkbox from "@mui/material/Checkbox";
import { Box, FormControlLabel } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import { attackProcessActionCreators, hostActionCreators } from "../../redux";
import { AttackOption, AttackOptions, Host } from "../../utils/classes/Host";
import clone from "clone";
import { NfsMounted } from "../../utils/classes/NsfMounted";
import { NsfExport } from "../../utils/classes/NsfExport";
import BasicSelect from "../Select/Select";
import { SelectType } from "../../utils/enums/TypeSelect";
import { TypeExploit } from "../../utils/enums/TypeExploit";
import { AccessTypes } from "../../utils/enums/AccessTypes";
import { BlackListDirection } from "../../utils/classes/Host";
import { RootState } from "../../redux/reducers/RootReducer";
interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  property: NodeProperties;
  data?: Service | Vulnerbility | NfsMounted | NsfExport | AttackOptions;
  host: Host;
}

export default function FormDialog({
  open,
  property,
  setOpen,
  data,
  host,
}: Props) {
  const dispatch = useDispatch();

  const attackProcessState = useSelector(
    (state: RootState) => state.attackProcess
  );

  const {
    addVulnerbilityPending,
    addServicePending,
    addNfsMountedPending,
    addNfsExportedPending,
    addBlackDirectionPending,
  } = bindActionCreators(hostActionCreators, dispatch);

  const { updateAttackOptionsPending } = bindActionCreators(
    attackProcessActionCreators,
    dispatch
  );

  const handleClose = () => {
    setOpen(false);
  };

  const [dataUpdate, setDataUpdate] = useState<
    | Service
    | Vulnerbility
    | NfsMounted
    | NsfExport
    | BlackListDirection
    | AttackOptions
  >();

  // Set giá trị khởi tạo đối với từng property
  useEffect(() => {
    if (property === NodeProperties.Vulnerbilities) {
      if (data) {
        setDataUpdate(data as Vulnerbility);
      } else {
        setDataUpdate(new Vulnerbility());
      }
    }
    if (property === NodeProperties.networkServiceInfo) {
      if (data) {
        setDataUpdate(data as Service);
      } else {
        let temp = new Service();
        temp.host = host.label.text;
        setDataUpdate(temp);
      }
    }

    if (property === NodeProperties.nfsMounted) {
      if (data) {
        setDataUpdate(data as NfsMounted);
      } else {
        let temp = new NfsMounted();
        temp.host = host.label.text;
        setDataUpdate(temp);
      }
    }

    if (property === NodeProperties.nsfExportInfos) {
      if (data) {
        setDataUpdate(data as NsfExport);
      } else {
        let temp = new NsfExport();
        temp.fileServer = host.label.text;
        setDataUpdate(temp);
      }
    }

    if (property === NodeProperties.BlackListDirection) {
      setDataUpdate(new BlackListDirection());
    }

    if (property === NodeProperties.AttackOptions) {
      if (data) {
        setDataUpdate(data);
      } else {
        setDataUpdate(host.AttackOptions);
      }
    }
  }, [data, property]);

  const renderInput = (property: NodeProperties) => {
    switch (property) {
      case NodeProperties.Vulnerbilities:
        return (
          <>
            <TextField
              autoFocus
              margin="dense"
              id="cve"
              label="CVE"
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) => {
                setDataUpdate((currentDataUpdate) => {
                  if (currentDataUpdate) {
                    if (property === NodeProperties.Vulnerbilities) {
                      if (dataUpdate) {
                        let temp = clone(dataUpdate) as Vulnerbility;
                        temp.vulExist.cve = e.target.value;
                        return temp;
                      }
                    }
                  }
                });
              }}
              required
            />

            <TextField
              margin="dense"
              id="Service"
              label="Service"
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) => {
                setDataUpdate((currentDataUpdate) => {
                  if (currentDataUpdate) {
                    if (property === NodeProperties.Vulnerbilities) {
                      if (dataUpdate) {
                        let temp = clone(dataUpdate) as Vulnerbility;
                        temp.vulExist.service = e.target.value;
                        return temp;
                      }
                    }
                  }
                });
              }}
              sx={{ marginBottom: "2rem" }}
              required
            />
            <BasicSelect
              handleChange={(e) => {
                setDataUpdate((currentDataUpdate) => {
                  if (currentDataUpdate) {
                    if (property === NodeProperties.Vulnerbilities) {
                      if (dataUpdate) {
                        let temp = clone(dataUpdate) as Vulnerbility;
                        temp.vulProp.typeExploit = e.target
                          .value as TypeExploit;
                        return temp;
                      }
                    }
                  }
                });
              }}
              label={SelectType.TypeExploit}
            />
            <FormControlLabel
              control={
                <Checkbox
                  onChange={(e) => {
                    setDataUpdate((currentDataUpdate) => {
                      if (currentDataUpdate) {
                        if (property === NodeProperties.Vulnerbilities) {
                          if (dataUpdate) {
                            let temp = clone(dataUpdate) as Vulnerbility;
                            temp.vulProp.isPrivEscalation = e.target.checked
                              ? true
                              : false;
                            return temp;
                          }
                        }
                      }
                    });
                  }}
                />
              }
              label="Is Privileged Escalation"
            />
          </>
        );
      case NodeProperties.networkServiceInfo:
        return (
          <>
            <TextField
              autoFocus
              margin="dense"
              id="service"
              label="Service"
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) => {
                setDataUpdate((currentDataUpdate) => {
                  if (currentDataUpdate) {
                    if (property === NodeProperties.networkServiceInfo) {
                      if (dataUpdate) {
                        let temp = clone(dataUpdate) as Service;
                        temp.service = e.target.value;
                        return temp;
                      }
                    }
                  }
                });
              }}
              required
            />
            <TextField
              margin="dense"
              id="protocol"
              label="Protocol"
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) => {
                setDataUpdate((currentDataUpdate) => {
                  if (currentDataUpdate) {
                    if (property === NodeProperties.networkServiceInfo) {
                      if (dataUpdate) {
                        let temp = clone(dataUpdate) as Service;
                        temp.protocol = e.target.value;
                        return temp;
                      }
                    }
                  }
                });
              }}
              required
            />
            <TextField
              margin="dense"
              id="privilege"
              label="Privilege User"
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) => {
                setDataUpdate((currentDataUpdate) => {
                  if (currentDataUpdate) {
                    if (property === NodeProperties.networkServiceInfo) {
                      if (dataUpdate) {
                        let temp = clone(dataUpdate) as Service;
                        temp.privilege_user = e.target.value;
                        return temp;
                      }
                    }
                  }
                });
              }}
              required
            />
            <TextField
              margin="dense"
              id="privilege"
              label="Port"
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) => {
                setDataUpdate((currentDataUpdate) => {
                  if (currentDataUpdate) {
                    if (property === NodeProperties.networkServiceInfo) {
                      if (dataUpdate) {
                        let temp = clone(dataUpdate) as Service;
                        temp.port = Number(e.target.value);
                        return temp;
                      }
                    }
                  }
                });
              }}
              required
            />
          </>
        );
      case NodeProperties.nfsMounted:
        return (
          <>
            <TextField
              autoFocus
              margin="dense"
              id="fileServerPath"
              label="fileServerPath"
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) => {
                setDataUpdate((currentDataUpdate) => {
                  if (currentDataUpdate) {
                    if (property === NodeProperties.nfsMounted) {
                      if (dataUpdate) {
                        let temp = clone(dataUpdate) as NfsMounted;
                        temp.fileServerPath = e.target.value;
                        return temp;
                      }
                    }
                  }
                });
              }}
              required
            />
            <TextField
              margin="dense"
              id="localPath"
              label="localPath"
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) => {
                setDataUpdate((currentDataUpdate) => {
                  if (currentDataUpdate) {
                    if (property === NodeProperties.nfsMounted) {
                      if (dataUpdate) {
                        let temp = clone(dataUpdate) as NfsMounted;
                        temp.localPath = e.target.value;
                        return temp;
                      }
                    }
                  }
                });
              }}
              required
              sx={{ marginBottom: "2rem" }}
            />
            <BasicSelect
              handleChange={(e) => {
                setDataUpdate((currentDataUpdate) => {
                  if (currentDataUpdate) {
                    if (property === NodeProperties.nfsMounted) {
                      if (dataUpdate) {
                        let temp = clone(dataUpdate) as NfsMounted;
                        temp.fileServer = e.target.value;
                        return temp;
                      }
                    }
                  }
                });
              }}
              label={SelectType.FileServerNode}
            />
            <Box sx={{ marginTop: "2rem" }}>
              <BasicSelect
                handleChange={(e) => {
                  setDataUpdate((currentDataUpdate) => {
                    if (currentDataUpdate) {
                      if (property === NodeProperties.nfsMounted) {
                        if (dataUpdate) {
                          let temp = clone(dataUpdate) as NfsMounted;
                          temp.accessType = e.target.value as AccessTypes;
                          return temp;
                        }
                      }
                    }
                  });
                }}
                label={SelectType.AccessType}
              />
            </Box>
          </>
        );
      case NodeProperties.nsfExportInfos:
        return (
          <>
            <TextField
              autoFocus
              margin="dense"
              id="Path"
              label="Path"
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) => {
                setDataUpdate((currentDataUpdate) => {
                  if (currentDataUpdate) {
                    if (property === NodeProperties.nsfExportInfos) {
                      if (dataUpdate) {
                        let temp = clone(dataUpdate) as NsfExport;
                        temp.path = e.target.value;
                        return temp;
                      }
                    }
                  }
                });
              }}
              sx={{ marginBottom: "2rem" }}
            />
            <BasicSelect
              handleChange={(e) => {
                setDataUpdate((currentDataUpdate) => {
                  if (currentDataUpdate) {
                    if (property === NodeProperties.nsfExportInfos) {
                      if (dataUpdate) {
                        let temp = clone(dataUpdate) as NsfExport;
                        temp.client = e.target.value;
                        return temp;
                      }
                    }
                  }
                });
              }}
              label={SelectType.ClientNode}
            />
          </>
        );
      case NodeProperties.BlackListDirection:
        return (
          <>
            <Box sx={{ marginBottom: "2rem", marginTop: "2rem" }}>
              <BasicSelect
                handleChange={(e) => {
                  setDataUpdate((currentDataUpdate) => {
                    if (currentDataUpdate) {
                      if (property === NodeProperties.BlackListDirection) {
                        if (dataUpdate) {
                          let temp = clone(dataUpdate) as BlackListDirection;
                          temp.from = e.target.value;
                          return temp;
                        }
                      }
                    }
                  });
                }}
                label={SelectType.NodeFrom}
              />
            </Box>

            <BasicSelect
              handleChange={(e) => {
                setDataUpdate((currentDataUpdate) => {
                  if (currentDataUpdate) {
                    if (property === NodeProperties.BlackListDirection) {
                      if (dataUpdate) {
                        let temp = clone(dataUpdate) as BlackListDirection;
                        temp.to = e.target.value;
                        return temp;
                      }
                    }
                  }
                });
              }}
              label={SelectType.NodeTo}
            />
          </>
        );
      case NodeProperties.AttackOptions:
        console.log("rendering attack options");
        console.log(dataUpdate);
        return dataUpdate && dataUpdate.type === "AttackOptions"
          ? dataUpdate.value.map((attackOption: AttackOption) => {
              console.log("rendering text");
              return (
                <TextField
                  autoFocus
                  margin="dense"
                  id={attackOption.name}
                  label={attackOption.name}
                  value={attackOption.value}
                  type="text"
                  fullWidth
                  variant="standard"
                  onChange={(e) => {
                    setDataUpdate(() => {
                      if (property === NodeProperties.AttackOptions) {
                        if (dataUpdate) {
                          let dataUpdateReRender = clone(dataUpdate);
                          for (let i = 0; i < dataUpdate.value.length; i++) {
                            if (
                              dataUpdateReRender.value[i].name ===
                              attackOption.name
                            ) {
                              dataUpdateReRender.value[i].value =
                                e.target.value;
                              break;
                            }
                          }
                          return dataUpdateReRender;
                        }
                      }
                    });
                  }}
                  required
                />
              );
            })
          : null;
      default:
        break;
    }
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Nhập dữ liệu</DialogTitle>
        <DialogContent>
          <DialogContentText>Nhập dữ liệu cho {property}</DialogContentText>
          {renderInput(property)}
        </DialogContent>
        <DialogActions>
          <Button sx={{ padding: "1rem" }} onClick={handleClose}>
            Hủy
          </Button>
          <Button
            sx={{ padding: "1rem" }}
            onClick={() => {
              if (dataUpdate) {
                if (property === NodeProperties.Vulnerbilities) {
                  if (dataUpdate) {
                    addVulnerbilityPending({
                      host: host,
                      vulnerbility: dataUpdate as Vulnerbility,
                    });
                  }
                }
                if (property === NodeProperties.networkServiceInfo) {
                  if (dataUpdate) {
                    addServicePending({
                      host: host,
                      service: dataUpdate as Service,
                    });
                  }
                }
                if (property === NodeProperties.nfsMounted) {
                  if (dataUpdate) {
                    addNfsMountedPending({
                      host: host,
                      nfsMounted: dataUpdate as NfsMounted,
                    });
                  }
                }
                if (property === NodeProperties.nsfExportInfos) {
                  if (dataUpdate) {
                    addNfsExportedPending({
                      host: host,
                      nfsExported: dataUpdate as NsfExport,
                    });
                  }
                }

                if (property === NodeProperties.BlackListDirection) {
                  if (dataUpdate) {
                    if (
                      (dataUpdate as BlackListDirection).from !== "" &&
                      (dataUpdate as BlackListDirection).to !== ""
                    ) {
                      addBlackDirectionPending({
                        host: host,
                        blackDirection: dataUpdate as BlackListDirection,
                      });
                    }
                  }
                }

                // Attack Options
                if (property === NodeProperties.AttackOptions) {
                  if (dataUpdate && dataUpdate.type === "AttackOptions") {
                    // Update to store
                    dataUpdate.value.forEach((attackOption) => {
                      updateAttackOptionsPending({
                        hostLabel: host.label.text,
                        name: attackOption.name,
                        value: attackOption.value,
                        isInitial: attackProcessState.isInitalAddAttackOptions
                          ? attackProcessState.isInitalAddAttackOptions
                          : false,
                        moduleName: attackOption.moduleName,
                      });
                    });
                  }
                }
              }
              handleClose();
            }}
          >
            {dataUpdate?.type === "AttackOptions" ? "Chấp nhận" : "Thêm"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
