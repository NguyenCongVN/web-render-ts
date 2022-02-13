import { RootObject } from "../interfaces/IGNS3";
class GNS3 {
  constructor(json: any) {
    try {
      this.root = json as RootObject;
    } catch (error) {
      throw error;
    }
  }
  root: RootObject;
}

export { GNS3 };
