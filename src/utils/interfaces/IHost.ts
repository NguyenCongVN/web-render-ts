import { Node2 } from "./ITopology";

export interface IHost extends Node2 {
  IP: string;
  CVE: string[];
  NSF: string[];
}
