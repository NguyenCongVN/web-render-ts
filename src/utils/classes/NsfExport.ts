import { INfsExport } from "../interfaces/INfsExport";

class NsfExport implements INfsExport {
  type: "INfsExport" = "INfsExport";
  id: string = "";
  fileServer: string = "";
  path: string = "";
  client: string = "";
  accessType: "_anyAccess" = "_anyAccess";
}

export { NsfExport };
