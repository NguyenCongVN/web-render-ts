import { Host } from "../../utils/classes/Host";
import { Vulnerbility } from "../../utils/classes/Vulnerbility";

export interface AddVulnerbilityPayload {
  vulnerbility: Vulnerbility;
  host: Host;
}
