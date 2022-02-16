export interface INfsMounted {
  type: "INfsMounted";
  id: string;
  host: string;
  localPath: string;
  fileServer: string;
  fileServerPath: string;
}
