import { Host } from "../../utils/classes/Host";
import { NsfExport } from "../../utils/classes/NsfExport";
import { NfsMounted } from "../../utils/classes/NsfMounted";
import { Service } from "../../utils/classes/Service";
import { Vulnerbility } from "../../utils/classes/Vulnerbility";

export interface AddVulnerbilityPayload {
  vulnerbility: Vulnerbility;
  host: Host;
}

export interface RemoveVulnerbilityPayload {
  vulnerbility: Vulnerbility;
  host: Host;
}

export interface AddServicePayload {
  service: Service;
  host: Host;
}

export interface RemoveServicePayload {
  service: Service;
  host: Host;
}

export interface AddNfsMountedPayload {
  nfsMounted: NfsMounted;
  host: Host;
}

export interface RemoveNfsMountedPayload {
  nfsMounted: NfsMounted;
  host: Host;
}

export interface AddNfsExportedPayload {
  nfsExported: NsfExport;
  host: Host;
}

export interface RemoveNfsExportedPayload {
  nfsExported: NsfExport;
  host: Host;
}
