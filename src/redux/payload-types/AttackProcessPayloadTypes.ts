import {
  CommandLine,
  IndividualAttackStatus,
} from "../reducers/AttackProcessReducer";
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
  result: string;
  commandId: string;
}

export interface SendCommandPayload {
  commandId: string;
  commandLine: CommandLine;
}

export interface FailedCommandPayload {
  commandId: string;
  commandLineId: string;
}

export interface SuccessCommandPayload {
  commandId: string;
  commandLineId: string;
}

export interface ReceivedAddAttackOptionsPayload {
  hostLabel: string;
  name: string;
}

export interface UpdateAttackOptionsPayload {
  hostLabel: string;
  name: string;
  value: string;
}

// payload update attack option after done
export interface UpdateAttackOptionsPayload {
  hostLabel: string;
  name: string;
  value: string;
  isInitial: boolean; // check if prompted or update manulally.
}
