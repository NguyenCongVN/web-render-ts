import { INfsExport } from "./INfsExport";
import { INfsMounted } from "./INfsMounted";
import { IService } from "./IService";
import { Node2 } from "./ITopology";
import { IVulnerbility } from "./IVulnerability";

export interface IHost extends Node2 {
  IP: string;
  Vulnerbilities: IVulnerbility[];
  NSFMounted: INfsMounted[];
  NSFExportInfo: INfsExport[];
  Services: IService[];
  IsSwitch: boolean;
  IsRouter: boolean;
}
