import { IHost } from "../interfaces/IHost";
import { INfsExport } from "../interfaces/INfsExport";
import { INfsMounted } from "../interfaces/INfsMounted";
import { IService } from "../interfaces/IService";
import { Label2 } from "../interfaces/ITopology";
import { IVulnerbility } from "../interfaces/IVulnerability";

class Host implements IHost {
  constructor(json: any) {
    let hostJsonObject = json as IHost;
    this.IP = hostJsonObject.IP;
    this.label = hostJsonObject.label;
    this.x = hostJsonObject.x;
    this.y = hostJsonObject.y;
    this.symbol = hostJsonObject.symbol;
    this.node_id = hostJsonObject.node_id;
    this.height = hostJsonObject.height;
    this.width = hostJsonObject.width;
  }
  isAttacker = false;
  isTarget = false;

  IP: string = "";
  private _isRouter: boolean = false;

  IsRouter(): boolean {
    // Kiểm tra xem có phải là router hay không
    if (this.symbol.indexOf("router") > 0) {
      this._isRouter = true;
    }
    return this._isRouter;
  }

  private _isSwitch: boolean = false;

  IsSwitch(): boolean {
    // Kiểm tra xem có phải là switch hay không
    if (this.symbol.indexOf("switch") > 0) {
      this._isSwitch = true;
    }
    return this._isSwitch;
  }

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
}

export { Host };
