import { IndividualAttackStatus } from "../reducers/AttackProcessReducer";
export interface StartAttackPendingPayload {
  scanConfigFile: string;
  topologyFile: string;
  connectedMap: string;
  scanReportId: { hostLabel: string; reportId: string | undefined }[];
}

export interface StartAttackSuccessPayload {
  currentHostLabel: string;
  currentStateNum: number;
}

export interface AddDetailPayload {
  hostLabel: string;
  Detail: string;
  Status: IndividualAttackStatus;
}

export interface ScanSuccessPayload {
  hostLabel: string;
  reportId: string;
}

export interface ScanFailedPayload {
  hostLabel: string;
  reason: string;
}

export {};
