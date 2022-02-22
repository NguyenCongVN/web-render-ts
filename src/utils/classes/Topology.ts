import { IRootObject, ITopology } from "../interfaces/ITopology";
import { Service } from "./Service";
import { Vulnerbility } from "./Vulnerbility";
import { Host } from "./Host";
import { Link } from "./Link";
class Topology implements ITopology {
  constructor(json: any) {
    try {
      // Cast từ json sang interface
      let templeJsonObject = json as IRootObject;

      if (templeJsonObject.topology) {
        // Kiểm tra các giá trị và khởi tạo cho đối tượng
        if (templeJsonObject.topology.nodes) {
          if (templeJsonObject.topology.nodes.length > 0) {
            for (var i = 0; i < templeJsonObject.topology.nodes.length; i++) {
              // cast từ node object sang Hosts
              let host: Host = new Host(templeJsonObject.topology.nodes[i]);
              // thêm vào nodes của topology hiện tại
              this.nodes.push(host);
            }
          }

          if (templeJsonObject.topology.links) {
            if (templeJsonObject.topology.links.length > 0) {
              for (i = 0; i < templeJsonObject.topology.links.length; i++) {
                // cast từ node object sang Hosts
                let link: Link = new Link(templeJsonObject.topology.links[i]);
                // thêm vào nodes của topology hiện tại
                this.links.push(link);
              }
            }
          }
        }
      }
    } catch (error) {
      throw error;
    }
  }
  nodes: Host[] = [];
  links: Link[] = [];
}

export { Topology };

export type dataRenderType = Service[] | Vulnerbility[] | string;