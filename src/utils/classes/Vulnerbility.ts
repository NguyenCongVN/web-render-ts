import {
  IVulExist,
  IVulnerbility,
  IVulProperty,
} from "../interfaces/IVulnerability";
class Vulnerbility implements IVulnerbility {
  constructor() {
    this.type = "IVulnerbility";
    this.id = "";
    this.vulExist = {
      cve: "",
      host: "",
      service: "",
    };
    this.vulProp = {
      cve: "",
      isPrivEscalation: false,
      typeExploit: "",
    };
  }
  id;
  type: "IVulnerbility";
  vulProp: IVulProperty;
  vulExist: IVulExist;
}

export { Vulnerbility };
