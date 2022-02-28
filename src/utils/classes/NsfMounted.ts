import { AccessTypes } from "../enums/AccessTypes";
import { INfsMounted } from "../interfaces/INfsMounted";

class NfsMounted implements INfsMounted {
  type: "INfsMounted" = "INfsMounted";
  id: string = "";
  host: string = "";
  localPath: string = "";
  fileServer: string = "";
  fileServerPath: string = "";
  accessType: AccessTypes = AccessTypes.read;
}

export { NfsMounted };
