export interface StartAttackPendingPayload {
  scanConfigFile: string;
  topologyFile: string;
  connectedMap: string;
  scanReportId: { hostLabel: string; reportId: string }[];
}

export {};
