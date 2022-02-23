import { ILink, Node } from "../interfaces/ITopology";
import { Host } from "./Host";

class Link implements ILink {
  constructor(json: any) {
    let templeJsonObject = json as ILink;
    this.link_id = templeJsonObject.link_id;
    this.nodes = templeJsonObject.nodes;
    this.hosts = [];
  }

  link_id: string = "";
  nodes: Node[];
  hosts: Host[];
}

export { Link };
