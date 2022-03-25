import { CommandLine, IndividualAttackStatus } from "../reducers/AttackProcessReducer";
export interface StartAttackPendingPayload {
  scanConfigFile: string;
  topologyFile: string;
  connectedMap: string;
  reachableMap: string;
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

export interface TrainingSuccessPayload {
  path: string;
}

export interface AttackStateChangePayload {
  currentState: number;
  currentHostLabel: string;
}

export interface AttackFaiedPayload {
  reason: string;
}

export interface GotShellPayload {
  shellId: string;
  hostLabel: string;
}

export interface GotMeterpreterPayload {
  meterpreterId: string;
  hostLabel: string;
}

export interface ReceivedCommandPayload {
  response: string;
  commandLineId: string;
}

export interface SendCommandPayload {
  commandId: string;
  commandLine: CommandLine;
}
