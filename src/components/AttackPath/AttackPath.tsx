/* eslint-disable react-hooks/exhaustive-deps */
import { Network, Node, Options, Edge } from "vis-network";
import { useRef, useEffect, useState } from "react";
import { Box } from "@mui/system";
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/reducers/RootReducer";
import clone from "clone";
import { bindActionCreators } from "@reduxjs/toolkit";
import { attackProcessActionCreators } from "../../redux";
import * as uuid from "uuid";

const AttackPathNetwork = () => {
  const attackProcessState = useSelector(
    (state: RootState) => state.attackProcess
  );
  const dispatch = useDispatch();

  const { toogleShowAttackPath } = bindActionCreators(
    attackProcessActionCreators,
    dispatch
  );

  // A reference to the div rendered by this component
  const domNode = useRef<HTMLDivElement>(null);

  // A reference to the vis network instance
  let network = useRef<Network | null>(null);

  // Vis network configuration
  let nodes: Node[] = [];

  let edges: Edge[] = [];

  const options: Options = {};
  //

  useEffect(() => {
    async function reload() {
      //  Chuyển từ topology sang dạng data format vis network
      nodes = [];
      edges = [];

      // convert from attack Path to node
      if (attackProcessState.attackPath) {
        let lastNodeID = "";
        attackProcessState.attackPath.split("\n").forEach((stringToken) => {
          if (stringToken.indexOf("CVE") === -1) {
            let [nodeState, detail, type, constant] = stringToken.split(",");
            if (nodeState.replace("-> ", "").trim() !== "") {
              nodes.push({
                id: nodeState.replace("-> ", "").trim(),
                label: `${detail}`,
              });
              if (lastNodeID !== "") {
                edges.push({
                  id: uuid.v1(),
                  from: lastNodeID.replace("-> ", "").trim(),
                  to: nodeState.replace("-> ", "").trim(),
                  arrows: { to: true },
                  length: 500,
                });
              }
            }

            lastNodeID = nodeState;
          } else {
            let [cveId, nodeStateConnectTo] = stringToken.split("->");
            if (cveId) {
              const id = uuid.v1();
              nodes.push({
                id: id,
                label: `${cveId}`,
              });
              edges.push({
                id: uuid.v1(),
                from: id.trim(),
                to: nodeStateConnectTo.trim(),
                arrows: { to: true },
                length: 500,
              });
            }
          }
        });
      }

      if (domNode.current) {
        network.current = new Network(
          domNode.current,
          {
            nodes,
            edges,
          },
          options
        );
      } else {
        if (network.current) {
          network.current.redraw();
        }
      }
    }
    reload();
  }, [attackProcessState.attackPath, domNode.current, network]);

  return (
    <Dialog
      sx={{
        display: attackProcessState.showAttackPathNetwork ? "block" : "none",
      }}
      fullWidth
      maxWidth="lg"
      open={true}
      onClose={toogleShowAttackPath}
    >
      <DialogTitle>Đường tấn công</DialogTitle>
      <DialogContent sx={{ height: "60vh", display: "flex" }}>
        <Box sx={{ width: "100%", height: "100%" }}>
          <Box
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              margin: "auto",
            }}
          >
            {/* Box to render Network */}
            <Box sx={{ width: "100%", height: "100%" }} ref={domNode}></Box>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Button onClick={toogleShowAttackPath}>Đóng</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AttackPathNetwork;
