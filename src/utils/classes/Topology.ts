import { RootObject } from "../interfaces/ITopology";
class Topology {
  constructor(json: any) {
    try {
      this.root = json as RootObject;
    } catch (error) {
      throw error;
    }
  }
  root: RootObject;
}

export { Topology };
