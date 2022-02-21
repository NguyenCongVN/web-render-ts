import { INfsMounted } from "../interfaces/INfsMounted";

class NfsMounted implements INfsMounted {
  constructor() {}

  type: "INfsMounted" = "INfsMounted";
  id: string = "";
  host: string = "";
  localPath: string = "";
  fileServer: string = "";
  fileServerPath: string = "";
}

export { NfsMounted };
