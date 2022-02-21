import { Network, Node, Options, Data, Edge } from "vis-network";
import { useRef, useEffect, useState } from "react";
import { Box } from "@mui/system";
import { Topology } from "../../utils/classes/Topology";
import { Container, Typography } from "@mui/material";
import DetailNode from "../DetailNode/DetailNode";
import { IHost } from "../../utils/interfaces/IHost";
import AlertDialog from "../AlertModal/AlertModal";
import { Host } from "../../utils/classes/Host";
import { Link } from "../../utils/classes/Link";

interface NetworkProps {
  topologyInput: Topology | undefined;
}

const VisNetwork = ({ topologyInput }: NetworkProps) => {
  const [selectedHost, setSelectedHost] = useState<Host | null | undefined>(
    null
  );

  const [isUpdateSuccess, setIsUpdateSuccess] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  const [topology, setTopology] = useState<Topology | undefined>(topologyInput);

  useEffect(() => {
    if (topologyInput) {
      setTopology(topologyInput);
    }
  }, [topologyInput]);

  // A reference to the div rendered by this component
  const domNode = useRef<HTMLDivElement>(null);

  // A reference to the vis network instance
  let network = useRef<Network | null>(null);

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

  let data: Data = {
    nodes,
    edges,
  };

  const options: Options = {};

  function getNodeFromId(id: string): undefined | Host {
    if (topology) {
      if (topology.nodes.length > 0) {
        return topology.nodes.find((host) => host.node_id === id);
      } else {
        return undefined;
      }
    }
  }

  function updateHost(hostToUpdate: Host): void {
    setIsUpdateSuccess(false);
    setIsUpdating(true);
    setTopology((currentTopology) => {
      if (currentTopology) {
        if (currentTopology.nodes.length > 0) {
          for (let i = 0; i < currentTopology.nodes.length; i++) {
            if (currentTopology.nodes[i].node_id === hostToUpdate.node_id) {
              currentTopology.nodes[i] = hostToUpdate;
              setIsUpdateSuccess(true);
              setIsUpdating(false);
              break;
            }
          }
          return currentTopology;
        }
      }
    });
  }

  useEffect(() => {
    if (topology) {
      //  Chuyển từ topology sang dạng data format vis network
      nodes = [];
      topology.nodes.forEach((host) => {
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
      topology.links.forEach((link) => {
        edges.push({
          id: link.link_id,
          from: link.nodes[0].node_id,
          to: link.nodes[1].node_id,
        });
      });

      data = {
        nodes,
        edges,
      };
    }
    if (domNode.current) {
      network.current = new Network(domNode.current, data, options);
    } else {
      if (network.current) {
        network.current.redraw();
      }
    }

    // Event in network
    network.current?.on("select", (e) => {
      console.log(e);
      setSelectedHost(getNodeFromId(e.nodes[0]));
    });

    network.current?.on("deselectNode", (e) => {
      setSelectedHost(null);
    });
  }, [domNode, network, options, topology]);

  return (
    <Box sx={{ width: "100vw" }}>
      {topology ? (
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
            <DetailNode hostInput={selectedHost} updateHost={updateHost} />
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
        open={!isUpdateSuccess && isUpdating}
        toogleOpen={() => {
          setIsUpdateSuccess(!isUpdateSuccess);
          setIsUpdating(false);
        }}
      />
    </Box>
  );
};

export default VisNetwork;
