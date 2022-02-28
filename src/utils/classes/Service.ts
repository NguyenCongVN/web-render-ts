import { IService } from "../interfaces/IService";

class Service implements IService {
  constructor() {
    this.id = "";
    this.host = "";
    this.service = "";
    this.protocol = "";
    this.privilege_user = "";
    this.type = "IService";
    this.port = 0;
  }
  id: string;
  host: string;
  privilege_user: string;
  protocol: string;
  service: string;
  port: number;
  type: "IService";
}

export { Service };
