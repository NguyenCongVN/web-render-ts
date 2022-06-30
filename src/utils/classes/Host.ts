import { IHost } from "../interfaces/IHost";
import { INfsExport } from "../interfaces/INfsExport";
import { INfsMounted } from "../interfaces/INfsMounted";
import { IService } from "../interfaces/IService";
import { Label2 } from "../interfaces/ITopology";
import { IVulnerbility } from "../interfaces/IVulnerability";

export class BlackListDirection {
  id: string = "";
  from: string = "";
  to: string = "";
  type: "BlackListDirection" = "BlackListDirection";
}

export class AttackOption {
  name: string = "";
  value: string = "";
  moduleName: string = "";
}

export class AttackOptions {
  constructor() {
    this.value = [];
  }
  type: "AttackOptions" = "AttackOptions";
  value: AttackOption[] = [];
}

class Host implements IHost {
  constructor(json: any) {
    let hostJsonObject = json as IHost;
    this.NetworkIP = hostJsonObject.NetworkIP;
    this.ScanIP = hostJsonObject.ScanIP;
    this.label = hostJsonObject.label;
    this.x = hostJsonObject.x;
    this.y = hostJsonObject.y;
    this.symbol = hostJsonObject.symbol;
    this.node_id = hostJsonObject.node_id;
    this.height = hostJsonObject.height;
    this.width = hostJsonObject.width;
    // Kiểm tra xem có phải là router hay không
    if (this.symbol.indexOf("router") > 0) {
      this.IsRouter = true;
    }

    // Kiểm tra xem có phải là switch hay không
    if (this.symbol.indexOf("switch") > 0) {
      this.IsSwitch = true;
    }
    this.AttackOptions = new AttackOptions();
  }
  isAttacker = false;
  isTarget = false;

  NetworkIP: string = "";
  ScanIP: string = "";
  IsRouter: boolean = false;
  IsSwitch: boolean = false;
  BlackListDirections: BlackListDirection[] = [];
  NSFExportInfo: INfsExport[] = [];
  NSFMounted: INfsMounted[] = [];
  Services: IService[] = [];
  Vulnerbilities: IVulnerbility[] = [];

  //   render props
  label: Label2;
  x: number = 100;
  y: number = 100;
  z: number = 100;
  symbol: string = "";
  node_id: string = "";
  height: number = 100;
  width: number = 100;

  // attack options
  AttackOptions: AttackOptions = new AttackOptions();
}

export { Host };
