export interface INfsExport {
  type: "INfsExport";
  id: string;
  fileServer: string;
  path: string;
  client: string;
  accessType: "_anyAccess";
}
