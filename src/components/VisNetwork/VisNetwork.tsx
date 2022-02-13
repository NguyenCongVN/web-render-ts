import { Network, Node, Options, Data, Edge } from "vis-network";
import { useRef, useEffect } from "react";
import { Box } from "@mui/system";
import { Topology } from "../../utils/classes/Topology";
import { Container, Typography } from "@mui/material";

interface NetworkProps {
  topology: Topology | null;
}

const VisNetwork = ({ topology }: NetworkProps) => {
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

  useEffect(() => {
    if (topology) {
      nodes = [];
      topology.root.topology.nodes.forEach((node) => {
        nodes.push({
          id: node.node_id,
          label: node.label.text,
          shape: "image",
          image: `${process.env.PUBLIC_URL}/assets/symbols/access_point.svg`,
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
  }, [domNode, network, options, topology]);

  return (
    <Container>
      {" "}
      {topology ? (
        <Box ref={domNode} style={{ height: "80vh" }} sx={{ border: 1 }} />
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
          ;
        </Container>
      )}
      ;
    </Container>
  );
};

export default VisNetwork;
