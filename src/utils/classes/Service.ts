import { IService } from "../interfaces/IService";

class Service implements IService {
  constructor() {
    this.id = "";
    this.host = "";
    this.service = "";
    this.protocol = "";
    this.privilege_user = "";
    this.type = "IService";
  }
  id: string;
  host: string;
  privilege_user: string;
  protocol: string;
  service: string;
  type: "IService";
}

export { Service };
