/* eslint-disable react-hooks/exhaustive-deps */
import { Network, Node, Options, Data, Edge } from "vis-network";
import { useRef, useEffect, useState } from "react";
import { Box } from "@mui/system";
import { Topology } from "../../utils/classes/Topology";
import { Container, Typography } from "@mui/material";
import DetailNode from "../DetailNode/DetailNode";
import { Host } from "../../utils/classes/Host";
import { Link } from "../../utils/classes/Link";
import {
  useDispatch,
  useSelector,
} from "react-redux";
import { RootState } from "../../redux/reducers/RootReducer";
import AlertDialog from "../AlertModal/AlertModal";
import {
  SetDraftHost,
  setHosts,
} from "../../redux/action-creators/Host.creators";
import { setLinks } from "../../redux/action-creators/Link.creators";
import clone from "clone";
interface NetworkProps {
  topologyInput: Topology | undefined;
}

const VisNetwork = ({ topologyInput }: NetworkProps) => {
  const hostsState = useSelector((state: RootState) => state.hosts);
  const dispatch = useDispatch();

  const [selectedHost, setSelectedHost] = useState<Host | undefined>(undefined);

  useEffect(() => {
    if (topologyInput) {
      dispatch(setHosts(clone(topologyInput.nodes)));
      dispatch(SetDraftHost(clone(topologyInput.nodes)));
      dispatch(setLinks(topologyInput.links));
      if (selectedHost) {
        setSelectedHost(getNodeFromId(selectedHost.node_id));
      }
    }
  }, [topologyInput]);

  // A reference to the div rendered by this component
  const domNode = useRef<HTMLDivElement>(null);

  // A reference to the vis network instance
  let network = useRef<Network | null>(null);

  // Vis network configuration
  let nodes: Node[] = [
    { id: 1, label: "Node 1", shape: "image", image: "" },
    { id: 2, label: "Node 2" },
    { id: 3, label: "Node 3" },
    { id: 4, label: "Node 4" },
    { id: 5, label: "Node 5" },
  ];

  let edges: Edge[] = [
    { from: 1, to: 3 },
    { from: 1, to: 2 },
    { from: 2, to: 4 },
    { from: 2, to: 5 },
  ];

  const options: Options = {};
  //

  function getNodeFromId(id: string): undefined | Host {
    if (hostsState.draftHosts.length > 0) {
      return hostsState.draftHosts.find((host) => host.node_id === id);
    } else {
      return undefined;
    }
  }

  useEffect(() => {
    if (topologyInput) {
      //  Chuyển từ topology sang dạng data format vis network
      nodes = [];
      topologyInput.nodes.forEach((host) => {
        nodes.push({
          id: host.node_id,
          label: host.label.text,
          shape: "image",
          image: `${process.env.PUBLIC_URL}/assets${host.symbol.substring(
            1,
            host.symbol.length
          )}`,
          x: host.x,
          y: host.y,
          size: (host.height / host.width) * 20,
        });
      });
      edges = [];
      topologyInput.links.forEach((link) => {
        edges.push({
          id: link.link_id,
          from: link.nodes[0].node_id,
          to: link.nodes[1].node_id,
        });
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

    // Event in network
    network.current?.on("select", (e) => {
      setSelectedHost(getNodeFromId(e.nodes[0]));
    });

    network.current?.on("deselectNode", (e) => {
      setSelectedHost(undefined);
    });
  }, [domNode, network, options, topologyInput]);

  return (
    <Box sx={{ width: "100vw" }}>
      {hostsState.hosts.length > 0 ? (
        <Box
          style={{
            border: 1,
            borderStyle: "solid",
            position: "relative",
            width: "95vw",
            margin: "auto",
          }}
        >
          <Box
            style={{
              position: "absolute",
              right: "0",
              top: "0",
              width: "30%",
              zIndex: 1000,
            }}
          >
            <DetailNode hostInput={selectedHost} />
          </Box>

          {/* Box to render Network */}
          <Box ref={domNode} style={{ height: "80vh" }}></Box>
        </Box>
      ) : (
        <Container
          style={{ height: "80vh" }}
          sx={{
            border: 1,
            justifyContent: "center",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography
            component="div"
            sx={{ display: "flex", fontSize: "2rem" }}
          >
            Vui lòng chọn topology
          </Typography>
        </Container>
      )}
      <AlertDialog
        open={
          !hostsState.isUpdateSuccess &&
          !hostsState.isUpdating &&
          hostsState.isUpdateFailed
        }
      />
    </Box>
  );
};

export default VisNetwork;
