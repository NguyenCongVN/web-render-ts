import { INfsExport } from "../interfaces/INfsExport";

class NsfExport implements INfsExport {
  constructor() {}

  type: "INfsExport" = "INfsExport";
  id: string = "";
  fileServer: string = "";
  path: string = "";
}

export { NsfExport };
