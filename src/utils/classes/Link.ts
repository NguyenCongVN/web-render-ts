import { ILink, Node } from "../interfaces/ITopology";

class Link implements ILink {
  constructor(json: any) {
    let templeJsonObject = json as ILink;
    this.link_id = templeJsonObject.link_id;
    this.nodes = templeJsonObject.nodes;
  }

  link_id: string = "";
  nodes: Node[];
}

export { Link };
