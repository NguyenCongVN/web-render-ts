import { Network, Node, Options, Data, Edge } from "vis-network";
import { useRef, useEffect, useState } from "react";
import { Box } from "@mui/system";
import { Topology } from "../../utils/classes/Topology";
import { Container, Typography } from "@mui/material";
import DetailNode from "../DetailNode/DetailNode";
import { IHost } from "../../utils/interfaces/IHost";
import { Link, Node2 } from "../../utils/interfaces/ITopology";
import AlertDialog from "../AlertModal/AlertModal";

interface NetworkProps {
  topology: Topology | null;
}

const VisNetwork = ({ topology }: NetworkProps) => {
  const [selectedHost, setSelectedHost] = useState<IHost | null | undefined>(
    null
  );

  const [isUpdateSuccess, setIsUpdateSuccess] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  // A reference to the div rendered by this component
  const domNode = useRef<HTMLDivElement>(null);

  // A reference to the vis network instance
  let network = useRef<Network | null>(null);

  let hostDatas: IHost[] = [];

  let linkDatas: Link[] = [];

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

  function getNodeFromId(id: string): undefined | IHost {
    if (hostDatas.length > 0) {
      return hostDatas.find((node) => node.node_id === id) as IHost;
    } else {
      return undefined;
    }
  }

  function updateHost(hostToUpdate: IHost): void {
    setIsUpdateSuccess(false);
    setIsUpdating(true);
    console.log(hostToUpdate);
    if (hostDatas.length > 0) {
      for (let i = 0; i < hostDatas.length; i++) {
        if (hostDatas[i].node_id === hostToUpdate.node_id) {
          hostDatas[i] = hostToUpdate;
          setIsUpdateSuccess(true);
          setIsUpdating(false);
          break;
        }
      }
    }
  }

  useEffect(() => {
    if (topology) {
      nodes = [];
      hostDatas = [];
      topology.root.topology.nodes.forEach((node) => {
        let host = node as IHost;
        if (node.symbol.indexOf("switch") > 0) {
          host.IsSwitch = true;
        }

        if (node.symbol.indexOf("router") > 0) {
          host.IsRouter = true;
        }
        hostDatas.push(host);
        nodes.push({
          id: node.node_id,
          label: node.label.text,
          shape: "image",
          image: `${process.env.PUBLIC_URL}/assets${node.symbol.substring(
            1,
            node.symbol.length
          )}`,
          x: node.x,
          y: node.y,
          size: (node.height / node.width) * 20,
        });
      });
      edges = [];
      linkDatas = [];
      topology.root.topology.links.forEach((link) => {
        linkDatas.push(link as Link);
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
            <DetailNode host={selectedHost} updateHost={updateHost} />
          </Box>
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
